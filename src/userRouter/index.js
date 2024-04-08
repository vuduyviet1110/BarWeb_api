const editAccountRoute = require("./editAccount");
const placeReservationRoute = require("./placeReservation");
const purchaseGiftCardRoute = require("./purchaseGiftCard");
const homePage = require("./homePage");
const signUpRoute = require("./sign-up");
const accountAuthenticationRoute = require("./accountAuthentication");
const changePasswordRoute = require("./changePwd");
function Userroute(app) {
  app.use("/sign-in", accountAuthenticationRoute);
  app.use("/sign-up", signUpRoute);
  app.use("/:id/profile", editAccountRoute);
  app.use("/:id/reservation", placeReservationRoute);
  app.use("/:id/giftCard", purchaseGiftCardRoute);
  app.use("/", homePage);
  app.use("/change-password", changePasswordRoute);
}
module.exports = Userroute;

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = await getUserData(id);
//  res.json(data);
//   res.send(data);
// });

// export default router;
