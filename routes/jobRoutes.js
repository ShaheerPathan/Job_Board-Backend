const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/authMiddleware');

router.post('api/jobs', auth('Employer'), jobController.create);
router.get('api/jobs', jobController.list);
router.put('api/jobs/:id', auth('Employer'), jobController.update);
router.delete('api/jobs/:id', auth('Employer'), jobController.remove);

module.exports = router;
