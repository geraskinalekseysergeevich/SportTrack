const mongoose = require('mongoose');

const presetSchema = new mongoose.Schema({
  timecreated: String,
  name: String,
  location: String,
  mood: String,
  comment: String,
  category: String,
  repetitions: Number,
  weight: Number,
  sets: Number
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  information: {type: Object},
  created_at: { type: Date, default: Date.now }, 
  items: [Array],
  exercises: [Array],
  presets: [presetSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;