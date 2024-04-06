const express = require("express");
// import api của express là router
const router = express.Router();
const HomePageController = require("../controllers/HomePageController");
// đường dẫn gốc
router.get("/", HomePageController.showInfo);

module.exports = router;
