const nodemailer = require('nodemailer');

require('dotenv').config();

module.exports =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.NODE_ENV == "development" 
      ?  process.env.SMPT_DEVELOPMENT_USERNAME 
      :  process.env.SMPT_PROD_USERNAME,
      pass: process.env.NODE_ENV == "development" 
      ?  process.env.SMPT_DEVELOPMENT_PASSWORD 
      :  process.env.SMPT_PROD_PASSWORD,
    },
  });