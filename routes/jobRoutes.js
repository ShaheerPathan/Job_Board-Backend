
const express = require('express'); 
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/authMiddleware');


router.get('/api/jobs', jobController.getAllJobs);
router.post('/api/jobs', auth(), jobController.createJob);
router.put('/api/jobs/:id', auth(), jobController.updateJob);
router.delete('/api/jobs/:id', auth(), jobController.deleteJob);

module.exports = router;
