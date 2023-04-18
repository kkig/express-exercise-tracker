const mongoose = require('mongoose');
const exerciseSchema = require('./ExerciseSchema');

const userDataSchema = new mongoose.Schema({
  username: {type: String, required: true},
  count: Number,
  log: [exerciseSchema],
});

module.exports = mongoose.model('UserData', userDataSchema);
