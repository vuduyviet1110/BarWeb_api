const express = require("express");
// import api của express là router
const router = express.Router();

const ReservationController = require("../controllers/ReservationController");
// đường dẫn gốc

router.get("/", ReservationController.show);
router.put("/:id", ReservationController.edit);
router.post("/", ReservationController.create);
router.delete("/:id", ReservationController.delete);
module.exports = router;
