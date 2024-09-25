const express = require("express");
// import api của express là router
const router = express.Router();

const SearchController = require("../controllers/AdminSearchController.js");
// đường dẫn gốc

router.get("/", SearchController.search);
module.exports = router;
