"use strict";

var nodemailer = require("nodemailer");
require("dotenv").config();

// Function to send email
var sendMail = function sendMail(_ref) {
  var email = _ref.email,
    subject = _ref.subject,
    html = _ref.html;
  return new Promise(function (resolve, reject) {
    // Create transporter with Gmail service
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        // Your email address
        pass: "aufu sdwc ifsh cwyq" // Your email password
      }
    });

    // Email message configuration
    var message = {
      from: "SWIP Speasky Bar",
      to: email,
      subject: subject,
      html: html
    };

    // Send email
    transporter.sendMail(message, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        reject(error); // Reject the promise with the error
      } else {
        console.log("Email sent successfully:", info);
        resolve(info); // Resolve the promise with the info object
      }
    });
  });
};
module.exports = sendMail;