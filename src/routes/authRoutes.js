import express from 'express';
import { oauth2Client } from '../utils/googleDrive.js';

const router = express.Router();

//default route to login to google and generate credential file
router.get('/auth/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive"
        ]
    });
    res.redirect(url);
});

router.get('/google/redirect', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    fs.writeFileSync("creds.json", JSON.stringify(tokens));
    res.send({
        "message": "success"
    });
});

export default router;