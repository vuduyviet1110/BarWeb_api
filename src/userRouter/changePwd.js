const express = require("express");
// import api của express là router
const router = express.Router();
const changePwdController = require("../controllers/changePwdController.js");

// đường dẫn gốc
router.put("/", changePwdController.changePassword);
module.exports = router;
