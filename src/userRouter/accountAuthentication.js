const express = require("express");
// import api của express là router
const router = express.Router();
const SignInController = require("../controllers/UserAuthController");

// đường dẫn gốc
router.post("/", SignInController.Auth);
router.get("/private/", SignInController.private);
module.exports = router;
