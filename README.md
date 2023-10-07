# Google Drive Video Download and Chunked Upload

This Node.js application allows you to download a large video file from a specific Google Drive directory and simultaneously upload it to another Google Drive directory using a chunked uploading mechanism. It also provides an endpoint to monitor the status of both the download and upload processes, offering visibility into the progress of each chunk.

## Prerequisites

Before using this application, you'll need to:

1. Set up Google Drive API credentials.
2. Install Node.js and the required packages.
3. Prepare your Google Drive directories.

### Set Up Google Drive API Credentials

1. Create a Google Cloud project: [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the Google Drive API for your project.
3. Create OAuth2 credentials and download the JSON file.
4. Rename the JSON file to `credentials.json` and place it in the root directory of this project.

### Install Node.js and Required Packages

Make sure you have Node.js installed. If not, download it from [nodejs.org](https://nodejs.org/).

Install the required Node.js packages by running the following command in your project directory:

```bash
npm install

###Prepare Google Drive Directories
Create Google Drive directories: one for the source video file and another for the destination where you want to upload the file. Note down the directory IDs.

###Configuration
Update the .env file with your specific configuration:
PORT=3000

CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
REDIRECT_URI=YOUR_REDIRECT_URI

