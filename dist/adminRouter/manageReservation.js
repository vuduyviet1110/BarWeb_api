"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var ReservationController = require("../controllers/ReservationController");
// đường dẫn gốc

router.get("/", ReservationController.show);
router.put("/", ReservationController.edit);
router.post("/", ReservationController.create);
router["delete"]("/", ReservationController["delete"]);
module.exports = router;