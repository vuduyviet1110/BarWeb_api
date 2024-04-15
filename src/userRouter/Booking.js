const express = require("express");
// import api của express là router
const router = express.Router();

const ReservationUserController = require("../controllers/BookingUserController");
// đường dẫn gốc
router.post("/", ReservationUserController.create);
module.exports = router;
