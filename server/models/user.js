const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  entries: [
    {
      date: Date,
      items: [
        {
          name: String,
          calories: Number,
          protein: Number,
          carbs: Number,
          fat: Number,
        },
      ],
      exercises: [
        {
          name: String,
          sets: Number,
          reps: Number,
          weight: Number,
        },
      ],
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;