# Google Drive Video Uploading and Downloading Project

This Node.js application facilitates the retrieval of large video files from a designated Google Drive directory. Simultaneously, it enables the uploading of these files to the Google Drive directory using a chunked uploading mechanism. Moreover, it includes an endpoint for monitoring the status of both the download and upload processes, allowing users to track the progress of each chunk.

## Prerequisites

### Set Up Google Drive API Credentials

1. Create a Google Cloud project: [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the Google Drive API for your project.
3. Create OAuth2 credentials and download the JSON file.
4. Rename the JSON file to `credentials.json` and place it in the project's root directory.

### Install Node.js and Required Packages

**Node.js:**

   - Ensure Node.js is installed by downloading it from [nodejs.org](https://nodejs.org/).

**Required Node.js Packages:**

   - Install necessary Node.js packages using npm:

     ```bash
     npm install express dotenv googleapis fs
     ```

### Prepare Google Drive Directories

Create two Google Drive directories: one for the source video file and another for the destination where you want to upload the file. Note down the directory IDs.

### Configuration

Update the `.env` file with your specific configuration:

```dotenv
PORT=3000

CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
REDIRECT_URI=YOUR_REDIRECT_URI
```

Replace `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET`, and `YOUR_REDIRECT_URI` with your actual Google Drive API credentials.

## Running the Application

To run the application, use the following command:

```bash
node src/index.js
```

This will start the server, and you can access the following endpoints:

- `/auth/googleapi` (Redirects to Google Drive for authentication)
- `/google/redirect` (Redirect URL after successful OAuth)
- `/file/uploadVideoFile` (Endpoint to save a video file to Google Drive)
- `/file/downloadVideoFile/:fileId` (Endpoint to download a video file from Google Drive)
- `/file/status` (Endpoint to show the status of uploaded files downloadedfiles upload progress download progress)
- `/file/fileDetails` (Endpoint with fileDetails of all the existing videos in drive (used for getting the file-id for downloading any video))

## Contributing

Feel free to contribute to this project via pull requests.








