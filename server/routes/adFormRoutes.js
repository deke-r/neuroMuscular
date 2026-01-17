const express = require('express');
const router = express.Router();
const { sendAdFormEmail } = require('../controllers/adFormController');

// POST /api/ad-form - Send ad form appointment email
router.post('/', sendAdFormEmail);

module.exports = router;
