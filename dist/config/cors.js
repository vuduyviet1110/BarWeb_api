"use strict";

var whitelist = ["http://localhost:3000/"];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
module.exports = {
  corsOptions: corsOptions
};