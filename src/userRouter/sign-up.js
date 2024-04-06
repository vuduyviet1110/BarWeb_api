const express = require("express");
// import api của express là router
const router = express.Router();

const SignUpController = require("../controllers/SignUpController");
// đường dẫn gốc

router.post("/", SignUpController.create);
module.exports = router;
