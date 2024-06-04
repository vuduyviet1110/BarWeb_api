"use strict";

var manageContentRoute = require("./manageContent");
var manageGiftCardRoute = require("./manageGiftCard");
var manageReservationRoute = require("./manageReservation");
var manageUserRoute = require("./manageUser");
var manageImageRoute = require("./manageImage");
var manageEvent = require("./manageEvent");
var adminAuth = require("./accountAuthentication");
var manageBeverageRoute = require("./manageBeverage");
function Adroute(app) {
  app.use("/admin/content", manageContentRoute);
  app.use("/admin/gallery", manageImageRoute);
  app.use("/admin/gift-card", manageGiftCardRoute);
  app.use("/admin/reservation", manageReservationRoute);
  app.use("/admin/user", manageUserRoute);
  app.use("/admin/event", manageEvent);
  app.use("/admin/auth", adminAuth);
  app.use("/admin/beverage", manageBeverageRoute);
}
module.exports = Adroute;