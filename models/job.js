const mongoose = require('mongoose');
const { timeStamp } = require('node:console');

const jobsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  jobType: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Remote'],
    required: true
  },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
  timeStamp:true
});

module.exports = mongoose.model('Job', jobsSchema);
