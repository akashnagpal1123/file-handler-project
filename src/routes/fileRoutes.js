import express from 'express';
import { oauth2Client } from '../utils/googleDrive.js';
import { google } from "googleapis";
import fs from "fs";

const router = express.Router();

// Variables to store progress of upload and download
let uploadProgress = 0;
let downloadProgress = 0;

// Counters for uploaded and downloaded files
let uploadedFiles = 0;
let downloadedFiles = 0;

// Middleware to update progress
router.use((req, res, next) => {
  req.uploadProgress = uploadProgress;
  req.downloadProgress = downloadProgress;
  req.uploadedFiles = uploadedFiles;
  req.downloadedFiles = downloadedFiles;
  next();
});

// Route to get status
router.get('/status', (req, res) => {
  res.json({
    uploadProgress: req.uploadProgress,
    downloadProgress: req.downloadProgress,
    uploadedFiles: req.uploadedFiles,
    downloadedFiles: req.downloadedFiles,
  });
});



// Upload video to drive
router.get('/uploadVideoFile', async (req, res) => {
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const media = {
    mimeType: "video/mp4",
    //You can choose any video here : test1.mp4  OR test2.mp4 OR test3.mp4
    body: fs.createReadStream("test2.mp4"),
  };

  // Track progress during upload
  media.body.on('data', (chunk) => {
    uploadProgress += chunk.length;
  });

  const driveRes = await drive.files.create({
    requestBody: {
      name: "testVideoUploaded.mp4",
      mimeType: "video/mp4"
    },
    media,
  });

  uploadedFiles++;

  res.send({
    "message": "Video Uploaded Successfully"
  });

  // Reset upload progress after completion
  uploadProgress = 0;
});

// Download video file from drive
router.get('/downloadVideoFile/:fileId', async (req, res) => {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const fileId = req.params.fileId;

  const driveRes = await drive.files.get({
    fileId: fileId,
    alt: 'media'
  });

  const blob = driveRes.data;

  // Convert the Blob to a Buffer
  const arrayBuffer = await blob.arrayBuffer();
  const videoBuffer = Buffer.from(arrayBuffer);

  //progress during download
  res.setHeader('Content-Disposition', `attachment; filename="downloaded_video.mp4"`);
  res.setHeader('Content-Type', 'video/mp4');
  res.send(videoBuffer);

  // Increment downloaded files counter
  downloadedFiles++;

  // Reset download progress after completion
  downloadProgress = 0;
});

// We use fileDetails route to read the <fileid> before downloading a file
router.get('/fileDetails', async (req, res) => {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const files = [];

  const driveRes = await drive.files.list({
    q: 'mimeType=\'video/mp4\'',
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive'
  });

  Array.prototype.push.apply(files, driveRes.files);

  driveRes.data.files.forEach(file => {
    console.log('Found File: ', file.name, file.id);
  });

  res.send({
    "message": "File List Fetched Successfully",
    "list": driveRes.data.files
  });
});


// Similarly  Upload image to drive  -> functionality 
// To use this functionality just un-comment below part

// router.get('/uploadImgFile', async (req, res) => {
//     const drive = google.drive({ version: "v3", auth: oauth2Client });
  
//     const media = {
//       mimeType: "image/jpeg",
//       body: fs.createReadStream("image.jpg"),
//     };
  
//     // Track progress during upload
//     media.body.on('data', (chunk) => {
//       uploadProgress += chunk.length;
//     });
  
//     const driveRes = await drive.files.create({
//       requestBody: {
//         name: "testIMG.jpg",
//         mimeType: "image/jpeg"
//       },
//       media,
//     });

//     uploadedFiles++;
  
//     res.send({
//       "message": "Image Uploaded Successfully"
//     });

//     uploadProgress = 0;
//   });

export default router;
