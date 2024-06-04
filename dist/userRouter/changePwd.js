"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var changePwdController = require("../controllers/changePwdController.js");

// đường dẫn gốc
router.put("/", changePwdController.changePassword);
module.exports = router;