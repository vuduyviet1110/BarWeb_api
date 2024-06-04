"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var SignUpController = require("../controllers/SignUpController");
// đường dẫn gốc

router.post("/", SignUpController.create);
module.exports = router;