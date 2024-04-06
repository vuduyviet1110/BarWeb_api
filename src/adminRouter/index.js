const manageContentRoute = require("./manageContent");
const manageGiftCardRoute = require("./manageGiftCard");
const manageReservationRoute = require("./manageReservation");
const manageUserRoute = require("./manageUser");
const manageImageRoute = require("./manageImage");

function Adroute(app) {
  app.use("/admin/content", manageContentRoute);
  app.use("/admin/image", manageImageRoute);
  app.use("/admin/gift-card", manageGiftCardRoute);
  app.use("/admin/reservation", manageReservationRoute);
  app.use("/admin/user", manageUserRoute);
  app.use("/admin/event", manageUserRoute);
}
module.exports = Adroute;
