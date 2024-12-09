const nodemailer = require('nodemailer');

//Create a transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", //SMTP server for Gmail
  port: 465, //Secure SMTP port
  secure: true, //Use SSL/TLS for secure connection
  auth: {
    user: process.env.EMAIL_USERNAME, //Environment variable for email username
    pass: process.env.EMAIL_PASSWORD, //Environment variable for email password
  },
});

//Function to send a registration email
const sendRegistrationEmail = async (email, username) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, //Sender's email address
      to: email, //Recipient's email address
      subject: 'Welcome to Virtualmart!', //Email subject
      text: `Hi ${username},\n\nThank you for registering at Virtualmart!
        We're excited to have you join our community.
        Your account is now set up, and 
        you can start exploring a wide range of products we offer.
        \n\nHappy shopping!\n\nBest regards,\nVirtualmart Team`, //Plain text email body
      html: `<p>Hi <strong>${username}</strong>,</p>
               <p>Thank you for registering at 
               <strong>Virtualmart</strong>! We're excited to have you join our community.</p>
               <p>Your account is now set up, 
               and you can start exploring a wide range of products we offer.</p>
               <p>Happy shopping!</p>
               <p>Best regards,<br>Virtualmart Team</p>`, //HTML email body
    });
    console.log('Registration email sent successfully');
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

module.exports = { sendRegistrationEmail };
