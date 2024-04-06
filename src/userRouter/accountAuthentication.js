const express = require("express");
// import api của express là router
const router = express.Router();
const SignInController = require("../controllers/UserAuthController");

// đường dẫn gốc
router.post("/", SignInController.Auth);

module.exports = router;
