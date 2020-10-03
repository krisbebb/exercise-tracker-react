const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema(
    {
      activityName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minLength: 3,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Activity = mongoose.model('Activity', activitySchema)
  
  module.exports = Activity