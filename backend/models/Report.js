const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  disaster: {
    type: String,
    required: true
  },

  severity: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  lat: {
    type: String,
    required: true
  },

  lng: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  file: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Report", reportSchema)