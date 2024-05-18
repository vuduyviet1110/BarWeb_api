const express = require("express");
// import api của express là router
const router = express.Router();
const BeverageController = require("../controllers/BeverageController");
const uploadCloud = require("../config/cloudinary.config");

router.get("/", BeverageController.show);
router.put("/", uploadCloud.single('image'), BeverageController.edit)


module.exports = router;