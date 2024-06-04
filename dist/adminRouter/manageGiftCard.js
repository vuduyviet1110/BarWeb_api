"use strict";

var express = require("express");
// import api của express là router
var router = express.Router();
var giftCardController = require("../controllers/GiftCardController");

// đường dẫn gốc
router.get("/", giftCardController.showAll);
router.post("/", giftCardController.create);
router.put("/", giftCardController.updateCard);
router["delete"]("/", giftCardController.deleteOrder);
module.exports = router;