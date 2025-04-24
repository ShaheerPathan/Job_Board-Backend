const Job = require('../models/job');

const createJob = (data) => Job.create(data);
const getJobs = (filter = {}) => Job.find(filter).populate('employer', 'fullname');
const updateJob = (id, data) => Job.findByIdAndUpdate(id, data, { new: true });
const deleteJob = (id) => Job.findByIdAndDelete(id);

module.exports = { createJob, getJobs, updateJob, deleteJob };
