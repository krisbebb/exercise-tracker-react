const mongoose = require('mongoose')
const Schema = mongoose.Schema

const exerciseSchema = new Schema(
  {
    activity: { type: String, required: true },
    reps: { type: String, required: true },
    weight: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise