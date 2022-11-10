const mongoose = require('mongoose');
const exerciseSchema = require('./ExerciseSchema');

// const userDataSchema = new mongoose.Schema({
//   username: {type: String, required: true},
//   count: Number,
//   exercise: [
//     {
//       description: String,
//       duration: Number,
//       date: String,
//     },
//   ],
// });

const userDataSchema = new mongoose.Schema({
  username: {type: String, required: true},
  count: Number,
  exercise: [exerciseSchema],
});

// const exerciseSchema = new mongoose.Schema({
//   description: {type: String, required: true},
//   duration: {type: Number, required: true},
//   date: String,
// });

module.exports = mongoose.model('UserData', userDataSchema);
// module.exports = mongoose.model('ExerciseData', exerciseSchema);
