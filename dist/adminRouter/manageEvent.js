"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var uploadCloud = require("../config/cloudinary.config");
var EventController = require("../controllers/EventController");
// đường dẫn gốc

router.get("/", EventController.show);
router.put("/", uploadCloud.single("image"), EventController.edit);
module.exports = router;