"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var HomePageController = require("../controllers/HomePageController");
// đường dẫn gốc
router.get("/:id", HomePageController.showInfo);
module.exports = router;