import dotenv from 'dotenv';
dotenv.config();
// console.log('Environment Variables:', process.env);
import { google } from 'googleapis';
import fs from 'fs';


const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
// console.log('CLIENT_ID:', process.env.CLIENT_ID);
// console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);
// console.log('REDIRECT_URI:', process.env.REDIRECT_URI);

//reading credentials file if present
try {
  const credentials = fs.readFileSync('credDetails.json');
  oauth2Client.setCredentials(JSON.parse(credentials));
  // console.log(credentials);
} catch (err) {
  console.error('The error is ', err)
  console.log('Credentials NOT found !!');
}

export { oauth2Client };