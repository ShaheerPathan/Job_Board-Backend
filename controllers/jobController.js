const jobService = require('../services/jobService');

const createJob = async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'Employer') {
    return res.status(403).json({ success: false, message: 'Only Admin or Employer can create jobs' });
  }

  try {
    const jobData = {
      ...req.body,
      createdBy: req.user._id
    };
    const job = await jobService.createJob(jobData);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.error('Create Job Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    console.error('Get Jobs Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await jobService.findJobById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (String(job.createdBy) !== String(req.user._id) && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this job' });
    }

    const updatedJob = await jobService.updateJobById(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedJob });
  } catch (err) {
    console.error('Update Job Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await jobService.findJobById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (String(job.createdBy) !== String(req.user._id) && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this job' });
    }

    await jobService.deleteJobById(req.params.id);
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Delete Job Error:', err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob
};
