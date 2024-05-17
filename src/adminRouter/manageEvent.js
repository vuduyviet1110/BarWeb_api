const express = require("express");
// import api của express là router
const router = express.Router();
const uploadCloud = require("../config/cloudinary.config");

const EventController = require("../controllers/EventController");
// đường dẫn gốc

router.get("/", EventController.show);
router.put("/", uploadCloud.single("image"), EventController.edit);
module.exports = router;
