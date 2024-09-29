const express = require("express");
// import api của express là router
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
// đường dẫn gốc
router.post("/payment", PaymentController.show);

module.exports = router;
