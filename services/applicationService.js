const Application = require('../models/application');

const applyToJob = (userId, jobId) => Application.create({ user: userId, job: jobId });
const getApplicationsByUser = (userId) => Application.find({ user: userId }).populate('job');

module.exports = { applyToJob, getApplicationsByUser };
