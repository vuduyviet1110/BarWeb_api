"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var ProfileUserController = require("../controllers/ProfileUserController");

// đường dẫn gốc
router.put("/", ProfileUserController.edit);
router.get("/", ProfileUserController.show);
module.exports = router;