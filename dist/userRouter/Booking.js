"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var ReservationUserController = require("../controllers/BookingUserController");
// đường dẫn gốc
router.post("/", ReservationUserController.create);
module.exports = router;