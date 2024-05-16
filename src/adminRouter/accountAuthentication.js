const express = require("express");
// import api của express là router
const router = express.Router();
const AdminAuthController = require("../controllers/AdminAuthController");

// đường dẫn gốc
router.post("/", AdminAuthController.Auth);
router.get("/:ad_id", AdminAuthController.getAdmin);
module.exports = router;
