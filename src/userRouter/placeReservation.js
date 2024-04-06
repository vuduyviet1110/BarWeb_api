const express = require("express");
// import api của express là router
const router = express.Router();

const ReservationUserController = require("../controllers/ReservationUserController");
// đường dẫn gốc

router.post("/:id", ReservationUserController.create);
module.exports = router;
