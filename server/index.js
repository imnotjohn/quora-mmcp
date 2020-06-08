require('dotenv').config();

const faker = require('faker');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const https = require('https');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const twilio = require('twilio');
const ClientCapability = twilio.jwt.ClientCapability;
const VoiceResponse = twilio.twiml.VoiceResponse;
const MessagingResponse = twilio.twiml.MessagingResponse;

const AccessToken = twilio.jwt.AccessToken;

const VoiceGrant = AccessToken.VoiceGrant; //test
const VideoGrant = AccessToken.VideoGrant;

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// app.get('/api/token', (req, res) => {
//     const capability = new ClientCapability({
//         accountSid: process.env.ACCOUNT_SID,
//         authToken: process.env.AUTH_TOKEN,
//     });

//     capability.addScope(
//         new ClientCapability.OutgoingClientScope({
//             applicationSid: process.env.TWIML_VOICE_APP_SID
//         })
//     );

//     const token = capability.toJwt();
//     console.log(token);

//     res.send({
//         token: token,
//     });
// });
app.get('/api/token', (req, res) => {
    const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: process.env.TWIML_VOICE_APP_SID,
        incomingAllow: true,
    });

    const token = new AccessToken(process.env.ACCOUNT_SID, process.env.TWILIO_PROJECT_API, process.env.TWILIO_PROJECT_SECRET);
    token.addGrant(voiceGrant);
    token.identity = process.env.REACT_APP_CLIENT_OVU;

    console.log(token.toJwt());
    res.send({
        token: token.toJwt(),
    });
})

app.post('/api/voice', (req, res) => {
    let voiceResponse = new VoiceResponse();

    //For Outgoing Call: Client --> Phone
	// voiceResponse.dial({
	// 	callerId: process.env.TWILIO_NUMBER,
	// }, '+18083888138');
	// res.setHeader('Content-Type', 'text/xml');
    // res.send(voiceResponse.toString());

    // For Outgoing Call: Client --> Client
    const dialToClient = voiceResponse.dial({
        callerId: process.env.TWILIO_NUMBER,
    })
    dialToClient.client(process.env.REACT_APP_CLIENT_MM);
    res.setHeader('Content-Type', 'text/xml');
	// res.send(dialToClient.toString());
	res.send(voiceResponse.toString()); //test
});

// Twilio Video
//test
app.post('/api/video', (req, res) => {
    const clientIdentity = req.body.identity;
    console.log(`clientIdentity: ${clientIdentity}`);
// app.get('/api/video', (req, res) => {

    const videoAccessToken = new AccessToken(
        process.env.ACCOUNT_SID,
        process.env.TWILIO_PROJECT_API,
        process.env.TWILIO_PROJECT_SECRET
    );

    // const clientIdentity = process.env.REACT_APP_CLIENT_OVU;
    videoAccessToken.identity = clientIdentity;

    const grant = new VideoGrant({
        room: process.env.VIDEO_ROOM
    });
    videoAccessToken.addGrant(grant);

    console.log(`video: ${videoAccessToken.toJwt()}`);

    res.send({
        identity: clientIdentity,
        token: videoAccessToken.toJwt(),
        room: process.env.VIDEO_ROOM
    });
})

https.createServer({
    key: fs.readFileSync('./server/key.pem'),
    cert: fs.readFileSync('./server/cert.pem'),
    passphrase: 'BaliButton!!'
}, app).listen(process.env.CLIENT_OVU_PORT, () => {
    console.log(`listening to port ${process.env.CLIENT_OVU_PORT}`);
});
