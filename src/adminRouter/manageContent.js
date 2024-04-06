const express = require("express");
// import api của express là router
const router = express.Router();

const ContentController = require("../controllers/ContentController");
// đường dẫn gốc

router.get("/", ContentController.show);
router.put("/:id", ContentController.edit);
router.post("/:id", ContentController.create);
router.delete("/:id", ContentController.delete);
module.exports = router;
