const accountAuthenticationRoute = require("./accountAuthentication");
const manageContentRoute = require("./manageContent");
const manageGiftCardRoute = require("./manageGiftCard");
const manageReservationRoute = require("./manageReservation");
const manageUserRoute = require("./manageUser");

function route(app) {
  app.use("Admin/accountAuthentication", accountAuthenticationRoute);
  app.use("Admin/manageContent", manageContentRoute);
  app.use("Admin/manageGiftCard", manageGiftCardRoute);
  app.use("Admin/manageReservation", manageReservationRoute);
  app.use("Admin/managerUser", manageUserRoute);
}
module.exports = route;
