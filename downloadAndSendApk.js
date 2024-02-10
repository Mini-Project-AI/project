require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const https = require('https');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// URL to download the APK file from the Expo server
const apkUrl = 'https://expo.dev/accounts/ai_horizon/projects/${ORGANISATION}/builds/${APP_ID}'; // Replace with the actual Expo URL

// Function to download the APK file
const downloadApk = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (error) => {
      fs.unlink(dest);
      reject(error.message);
    });
  });
};

// Path to save the downloaded APK file
const apkFilePath = './app.apk';

// Download the APK file from the Expo server
downloadApk(apkUrl, apkFilePath)
  .then(() => {
    console.log('APK downloaded successfully');
    
    // Define email options
    const mailOptions = {
      from: EMAIL_USER,
      to: RECIPIENT_EMAIL,
      subject: 'New APK Build',
      text: 'Please find the APK attached.',
      attachments: [{ filename: 'app.apk', path: apkFilePath }],
    };

    // Send email with the downloaded APK file as attachment
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  })
  .catch((error) => {
    console.error('Error downloading APK:', error);
  });
