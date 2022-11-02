const mongoose = require('mongoose');
const exerciseSchema = require('./ExerciseSchema');

module.exports = mongoose.model('ExerciseData', exerciseSchema);
