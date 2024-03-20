const express = require("express");
// import api của express là router
const router = express.Router();

const ContentController = require("../controllers/ContentController");
// đường dẫn gốc

router.get("/create", ContentController.create);
router.get("/:id/edit", ContentController.edit);
router.put("/:id", ContentController.update);
router.patch("/:id/restore/", ContentController.restore);
router.delete("/:id/hardDelete", ContentController.hardDelete);
router.delete("/:id", ContentController.delete);
router.get("/:slug", ContentController.show);
module.exports = router;
