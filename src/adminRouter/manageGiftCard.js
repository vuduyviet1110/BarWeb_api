const express = require('express');
// import api của express là router
const router = express.Router();
const newController = require('../app/controllers/NewsController');

// đường dẫn gốc
router.get('/:slug', newController.show);
router.get('/', newController.index);

module.exports = router;
