const express = require('express');
const multer  = require('multer');
const conversionController = require('../controllers/conversion-controller');
const upload = multer().single('upfile');
const router = express.Router();

router.post('/', upload, conversionController.convertToJSON);

module.exports = router;
