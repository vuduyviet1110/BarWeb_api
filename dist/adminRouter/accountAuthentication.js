"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var AdminAuthController = require("../controllers/AdminAuthController");

// đường dẫn gốc
router.post("/", AdminAuthController.Auth);
router.get("/:ad_id", AdminAuthController.getAdmin);
module.exports = router;