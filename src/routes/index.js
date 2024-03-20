const OrderRoute = require("./order");
const BookingRoute = require("./booking");
const ContentRoute = require("./content");

function route(app) {
  app.use("/Content", OrderRoute);
  app.use("/Content", ContentRoute);
  app.use("/booking", BookingRoute);
}
module.exports = route;
