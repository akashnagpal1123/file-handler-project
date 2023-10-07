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

**Node.js:**

   - Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
   - 
 **Required Node.js Packages:**

   - Install the necessary Node.js packages using npm:

     ```bash
     npm install express dotenv googleapis fs

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

Replace YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, and YOUR_REDIRECT_URI with your actual Google Drive API credentials.

###Running the Application:

To run the application, use the following command:

node index.js

This will start the server, and you can access the following endpoints:

To initiate the download and upload processes:
/auth/google (Redirects to Google Drive for authentication)
/google/redirect (Callback URL after successful Google Drive authentication)
/saveText/:sometext (Endpoint to save text content to Google Drive)
/saveImage (Endpoint to save an image file to Google Drive)
/saveVideo (Endpoint to save a video file to Google Drive)
/downloadVideo/:fileId (Endpoint to download a video file from Google Drive)


###Customization

You can customize the application by modifying the following parameters in the code:

MAX_CHUNK_SIZE: Define the maximum chunk size for chunked uploads.
POLL_INTERVAL: Adjust the polling interval for monitoring the progress.


###Contributing

Feel free to contribute to this project by creating issues or pull requests.


###License

This project is licensed under the MIT License - see the LICENSE file for details.









