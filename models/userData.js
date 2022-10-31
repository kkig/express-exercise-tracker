const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  username: {type: String, required: true},
  count: Number,
  exercise: [
    {
      description: String,
      duration: Number,
      date: String,
    },
  ],
});

module.exports = mongoose.model('UserData', userDataSchema);
