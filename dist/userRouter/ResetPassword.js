"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var ResetPasswordRoute = require("../controllers/ResetPassword");
// đường dẫn gốc
router.post("/", ResetPasswordRoute.create);
module.exports = router;