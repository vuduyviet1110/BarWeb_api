const express = require("express");
// import api của express là router
const router = express.Router();

const ContentController = require("../controllers/ContentController");
const uploadCloud = require("../config/cloudinary.config");
// đường dẫn gốc

router.get("/title", ContentController.showTitle);
router.get("/ourstory", ContentController.showOurstory);
router.put("/title", uploadCloud.single("image"), ContentController.editTitle);
router.put(
  "/ourstory",
  uploadCloud.fields([
    { name: "storyBgImage", maxCount: 1 },
    { name: "storySlideImage", maxCount: 1 },
  ]),
  ContentController.editOurStory
);
module.exports = router;
