const manageContentRoute = require("./manageContent");
const manageGiftCardRoute = require("./manageGiftCard");
const manageReservationRoute = require("./manageReservation");
const manageUserRoute = require("./manageUser");
const manageImageRoute = require("./manageImage");
const adminAuth = require("./accountAuthentication");
const manageEventRoute = require("./manageEvent");
const manageBeverageRoute = require("./manageBeverage");

function Adroute(app) {
  app.use("/admin/content", manageContentRoute);
  app.use("/admin/gallery", manageImageRoute);
  app.use("/admin/gift-card", manageGiftCardRoute);
  app.use("/admin/reservation", manageReservationRoute);
  app.use("/admin/user", manageUserRoute);
  app.use("/admin/event", manageUserRoute);
  app.use("/admin/auth", adminAuth);
  app.use("/admin/event", manageEventRoute);
  app.use("/admin/beverage", manageBeverageRoute);
}
module.exports = Adroute;
