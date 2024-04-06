const express = require("express");
// import api của express là router
const router = express.Router();
const ProfileUserController = require("../controllers/ProfileUserController");

// đường dẫn gốc
router.put("/profile", ProfileUserController.edit);
router.get("/profile", ProfileUserController.show);

module.exports = router;
