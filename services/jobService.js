const Job = require('../models/Job');

const createJob = async (jobData) => {
  const job = new Job(jobData);
  return await job.save();
};

const getAllJobs = async () => {
  return await Job.find().populate('createdBy', 'fullname email');
};

const findJobById = async (id) => {
  return await Job.findById(id);
};

const updateJobById = async (id, updateData) => {
  return await Job.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteJobById = async (id) => {
  return await Job.findByIdAndDelete(id);
};

module.exports = {
  createJob,
  getAlxlJobs,
  findJxobById,
  updateJobById,
  deleteJobById
};
