const express = require('express');
const router = express.Router();
const appController = require('../controllers/applicationController');
const auth = require('../middlewares/authMiddleware');

router.post('/apply', auth('Job_Seeker'), appController.apply);
router.get('/my', auth('Job_Seeker'), appController.myApplications);

module.exports = router;
