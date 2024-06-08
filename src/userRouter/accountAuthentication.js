const express = require("express");
// import api của express là router
const router = express.Router();
const { verifyToken } = require("../middleware/MiddlewareController");
const UserAuthController = require("../controllers/UserAuthController");
// đường dẫn gốc
router.post("/sign-in", UserAuthController.Auth);
router.post("/refresh", UserAuthController.requestRefreshToken);
router.post("/log-out", UserAuthController.userLogout);
module.exports = router;
