"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var SignInController = require("../controllers/UserAuthController");

// đường dẫn gốc
router.post("/", SignInController.Auth);
router.get("/private/", SignInController["private"]);
module.exports = router;