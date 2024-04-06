const editAccountRoute = require("./editAccount");
const placeReservationRoute = require("./placeReservation");
const purchaseGiftCardRoute = require("./purchaseGiftCard");
const homePage = require("./homePage");
const signUpRoute = require("./sign-up");
const accountAuthenticationRoute = require("./accountAuthentication");
function Userroute(app) {
  app.use("/profile", editAccountRoute);
  app.use("/reservation", placeReservationRoute);
  app.use("/giftCard", purchaseGiftCardRoute);
  app.use("/", homePage);
  app.use("/sign-in", accountAuthenticationRoute);
  app.use("/sign-up", signUpRoute);
}
module.exports = Userroute;

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = await getUserData(id);
//  res.json(data);
//   res.send(data);
// });

// export default router;
