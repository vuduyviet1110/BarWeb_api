const express = require("express");
// import api của express là router
const router = express.Router();
const BookingController = require("../controllers/BookingController");

// định nghĩa tuyến đường trong siteController
router.get("/", BookingController);

module.exports = router;
