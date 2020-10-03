const mongoose = require('mongoose')
const Schema = mongoose.Schema

const splitDaySchema = new Schema(
    {
      splitDay: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3,
      },
      activities: [String],
    },
    {
      timestamps: true,
    }
  );
  
  const SplitDay = mongoose.model('SplitDay', splitDaySchema)
  
  module.exports = SplitDay