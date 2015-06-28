// app/models/person.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema examples:
// http://mongoosejs.com/docs/schematypes.html

var PersonSchema = new Schema({
  updated:      { type: Date, default: Date.now },

  name:         String,
  headline:     String,
  summary:      String,
  location:     String,
  age:          { type: Number, min: 0, max: 120 },
  img:          { data: Buffer, contentType: String },

  // Cut this down to just strings
  positions:    [String],

  universities: [String]
});

module.exports = mongoose.model('Person', PersonSchema);