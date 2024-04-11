const express = require("express");
// import api của express là router
const router = express.Router();

const GiftCardUserControllerController = require("../controllers/GiftCardUserController");
// đường dẫn gốc

router.get("/", GiftCardUserControllerController.showUserOrder);
router.post("/", GiftCardUserControllerController.create);
module.exports = router;
