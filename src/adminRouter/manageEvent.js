const express = require("express");
// import api của express là router
const router = express.Router();
const EventController = require("../controllers/EventController");
const uploadCloud = require("../config/cloudinary.config");

router.get("/", EventController.show);



module.exports = router;