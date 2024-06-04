"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var UserController = require("../controllers/UserController");
// đường dẫn gốc

router.get("/", UserController.show);
router.put("/", UserController.edit);
router["delete"]("/", UserController["delete"]);
module.exports = router;