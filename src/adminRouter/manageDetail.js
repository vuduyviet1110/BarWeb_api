const express = require("express");
// import api của express là router
const router = express.Router();
const AdminDetailController = require("../controllers/AminDetaillController");

// đường dẫn gốc
router.get("/:field/:id", AdminDetailController.showDetails);
router.put("/", AdminDetailController.updateDetails);
router.delete("/", AdminDetailController.deleteDetails);
module.exports = router;
