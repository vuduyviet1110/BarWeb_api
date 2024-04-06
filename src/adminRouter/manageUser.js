const express = require("express");
// import api của express là router
const router = express.Router();

const ContentController = require("../controllers/ContentController");
// đường dẫn gốc

router.get("/", ContentController.show);
module.exports = router;
