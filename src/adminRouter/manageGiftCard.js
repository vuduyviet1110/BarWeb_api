const express = require("express");
// import api của express là router
const router = express.Router();
const giftCardController = require("../controllers/GiftCardController");

// đường dẫn gốc
router.get("/", giftCardController.showAll);
router.get("/:id", giftCardController.showDetails);
router.put("/", giftCardController.updateCard);
router.delete("/", giftCardController.deleteOrder);
module.exports = router;
