const appService = require('../services/applicationService');

exports.apply = async (req, res) => {
  const application = await appService.applyToJob(req.user.id, req.body.jobId);
  res.status(201).json(application);
};

exports.myApplications = async (req, res) => {
  const applications = await appService.getApplicationsByUser(req.user.id);
  res.json(applications);
};

