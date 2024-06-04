"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var BeverageController = require("../controllers/BeverageController");
var uploadCloud = require("../config/cloudinary.config");
router.get("/", BeverageController.show);
router.put("/", uploadCloud.single("image"), BeverageController.edit);
module.exports = router;