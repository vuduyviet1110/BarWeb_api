const express = require("express");
// import api của express là router
const router = express.Router();

const ImageController = require("../controllers/ImageController");
// đường dẫn gốc

router.get("/", ImageController.show);
router.put("/:id", ImageController.edit);
router.post("/:id", ImageController.create);
router.delete("/:id", ImageController.delete);
module.exports = router;
