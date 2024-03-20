const accountAuthenticationRoute = require("./accountAuthentication");
const editAccountRoute = require("./editAccount");
const placeReservationRoute = require("./placeReservation");
const purchaseGiftCardRoute = require("./purchaseGiftCard")

function route(app) {
  app.use("User/accountAuthentication", accountAuthenticationRoute);
  app.use("User/editAccount", editAccountRoute);
  app.use("User/placeReservation", placeReservationRoute);
  app.use("User/purchaseGiftCard", purchaseGiftCardRoute);
}
module.exports = route;
