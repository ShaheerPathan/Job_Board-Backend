const jobService = require('../services/jobService');

exports.create = async (req, res) => {
  const job = await jobService.createJob({ ...req.body, employer: req.user.id });
  res.status(201).json(job);
};

exports.list = async (req, res) => {
  const jobs = await jobService.getJobs(req.query);
  res.json(jobs);
};

exports.update = async (req, res) => {
  const updated = await jobService.updateJob(req.params.id, req.body);
  res.json(updated);
};

exports.remove = async (req, res) => {
  await jobService.deleteJob(req.params.id);
  res.sendStatus(204);
};
