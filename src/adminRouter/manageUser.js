const express = require("express");
// import api của express là router
const router = express.Router();

const UserController = require("../controllers/UserController");
// đường dẫn gốc

router.get("/", UserController.show);
router.put("/", UserController.edit);
router.delete("/", UserController.delete);
module.exports = router;
