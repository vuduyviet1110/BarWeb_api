const editAccountRoute = require("./editAccount");
const BookingRoute = require("./Booking");
const purchaseGiftCardRoute = require("./purchaseGiftCard");
const homePage = require("./homePage");
const signUpRoute = require("./sign-up");
const accountAuthenticationRoute = require("./accountAuthentication");
const changePasswordRoute = require("./changePwd");
const ResetPasswordRoute = require("./ResetPassword");
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
