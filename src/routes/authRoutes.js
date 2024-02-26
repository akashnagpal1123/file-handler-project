import express from 'express';
import { oauth2Client } from '../utils/googleDrive.js';
import fs from 'fs';
const router = express.Router();


router.get('/auth/googleapi', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/drive"
        ],
        response_type: "code",
        redirect_uri: "http://localhost:3000/google/redirect"
    });
    res.redirect(url);
});

router.get('/google/redirect', async (req, res) => {
    const { code } = req.query;
    console.log('Authorization Code:', code);
    //Handling active tokens in exchange of credentials json
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        fs.writeFileSync("credDetails.json", JSON.stringify(tokens));
        res.send({ "message": "Ok! Successfully Recieved" });
    } 
    //handing errors here
    catch (error) {
        console.error('Token Exchange Error:', error.message);
        res.status(500).send({ "error": "Internal Server Error" });
    }
});

export default router;