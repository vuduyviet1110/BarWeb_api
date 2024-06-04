"use strict";

var editAccountRoute = require("./editAccount");
var BookingRoute = require("./Booking");
var purchaseGiftCardRoute = require("./purchaseGiftCard");
var homePage = require("./homePage");
var signUpRoute = require("./sign-up");
var accountAuthenticationRoute = require("./accountAuthentication");
var changePasswordRoute = require("./changePwd");
var ResetPasswordRoute = require("./ResetPassword");
function Userroute(app) {
  app.use("/profile", editAccountRoute);
  app.use("/booking", BookingRoute);
  app.use("/giftCard", purchaseGiftCardRoute);
  app.use("/sign-in", accountAuthenticationRoute);
  app.use("/sign-up", signUpRoute);
  app.use("/change-password", changePasswordRoute);
  app.use("/reset-password", ResetPasswordRoute);
  app.use("/", homePage);
}
module.exports = Userroute;