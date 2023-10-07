import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//reading credentials file if present
try {
  const credentials = fs.readFileSync('creds.json');
  oauth2Client.setCredentials(JSON.parse(credentials));
} catch (err) {
  console.log('No Creds Found');
}

export { oauth2Client };