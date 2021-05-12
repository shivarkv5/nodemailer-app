const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '74869696546-q4phjod112tfp5f57i0u90kp0orkmqrn.apps.googleusercontent.com';
const CLEINT_SECRET = 'LL_KJ4R_0PMBWcZ6-Xc76zOE';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04djp7_22d3OwCgYIARAAGAQSNgF-L9Ir9Q-ovOi_v3SYvdm3-caACvTGNZ8SsAF8VyKzenL-PX7svIxZaz2K0C0s1r4aI8KhDw'; 

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'happyhealthgdp@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'happyhealthgdp@gmail.com',
      to: 'srkrao547@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));