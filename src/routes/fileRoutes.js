import express from 'express';
import { oauth2Client } from '../utils/googleDrive.js';
import { google } from "googleapis";
import fs from "fs";


const router = express.Router();

//use this route to save image to drive
router.get('/saveImage', async (req, res) => {
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const driveRes = await drive.files.create({
        requestBody: {
            name: "testIMG.jpg",
            mimeType: "image/jpeg"
        },
        media: {
            mimeType: "image/jpeg",
            body: fs.createReadStream("image.jpg")
        }
    })

    // console.log(driveRes);
    res.send({
        "message": "Image Uploaded Successfully"
    });
});

//use this route to save video to drive
router.get('/saveVideo', async (req, res) => {
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const driveRes = await drive.files.create({
        requestBody: {
            name: "testvideo.mp4",
            mimeType: "video/mp4"
        },
        media: {
            mimeType: "video/mp4",
            body: fs.createReadStream("video.mp4")
        }
    })

    // console.log(driveRes);
    res.send({
        "message": "Video Uploaded Successfully"
    });
});

//use this route to download a video file from drive
router.get('/downloadVideo/:fileId', async (req, res) => {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const fileId = req.params.fileId;

    const driveRes = await drive.files.get({
        fileId: fileId,
        alt: 'media'
    })

    const blob = driveRes.data;
    // Convert the Blob to a Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    const filePath = 'video.mp4';

    fs.writeFileSync(filePath, videoBuffer);

    res.send({
        "message": "Video Downloaded Successfully"
    });
});

router.get('/fileDetails', async (req, res) => {
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const files = [];

    const driveRes = await drive.files.list({
        q: 'mimeType=\'video/mp4\'',
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive'
    })

    Array.prototype.push.apply(files, driveRes.files);

    driveRes.data.files.forEach(file => {
        console.log('Found File: ', file.name, file.id);
    });;

    res.send({
        "message": "File List Fetched Successfully",
        "list": driveRes.data.files
    });
});

export default router;