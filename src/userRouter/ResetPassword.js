const express = require("express");
// import api của express là router
const router = express.Router();
const ResetPasswordRoute = require("../controllers/ResetPassword");
// đường dẫn gốc
router.post("/", ResetPasswordRoute.create);

module.exports = router;
