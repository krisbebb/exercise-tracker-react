const mongoose = require('mongoose')
const Schema = mongoose.Schema

const setSchema = new Schema(
  {
    activityName: { type: String, required: true },
    reps: { type: String, required: true },
    weight: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Set = mongoose.model('Set', setSchema)

module.exports = Set