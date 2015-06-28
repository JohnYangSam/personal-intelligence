// app/models/position.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PositionSchema = new Schema({
  updated:        { type: Date, default: Date.now },

  title:          String,
  organization:   Schema.Types.ObjectId,
  description:    String,
  start:          Date,
  end:            Date
});

module.exports = mongoose.model('Position', PositionSchema);