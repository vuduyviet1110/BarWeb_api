"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var GiftCardUserControllerController = require("../controllers/GiftCardUserController");
// đường dẫn gốc

router.get("/:id", GiftCardUserControllerController.showUserOrder);
router.post("/", GiftCardUserControllerController.create);
module.exports = router;