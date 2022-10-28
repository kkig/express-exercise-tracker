const mongoose = require('mongoose');

const exerciseLogSchema = new mongoose.Schema({
  username: String,
  count: Number,
  exercise: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

module.exports = mongoose.model('ExerciseLog', exerciseLogSchema);
