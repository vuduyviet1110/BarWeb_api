const express = require("express");
// import api của express là router
const router = express.Router();
const ImageController = require("../controllers/ImageController");
const uploadCloud = require("../config/cloudinary.config");
// đường dẫn gốc

router.get("/", ImageController.show);
router.put(
  "/",
  uploadCloud.fields([
    { name: "images1", maxCount: 1 },
    { name: "images2", maxCount: 1 },
    { name: "images3", maxCount: 1 },
    { name: "images4", maxCount: 1 },
    { name: "images5", maxCount: 1 },
    { name: "images6", maxCount: 1 },
    { name: "images7", maxCount: 1 },
    { name: "images8", maxCount: 1 },
  ]),
  ImageController.edit
);
module.exports = router;
