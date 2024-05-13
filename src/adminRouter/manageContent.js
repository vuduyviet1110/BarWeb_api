const express = require("express");
// import api của express là router
const router = express.Router();

const ContentController = require("../controllers/ContentController");
const uploadCloud = require("../config/cloudinary.config");
// đường dẫn gốc

router.get("/", ContentController.show);
router.put("/", uploadCloud.single("image"), ContentController.create);
module.exports = router;
