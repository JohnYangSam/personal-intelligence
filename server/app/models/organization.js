// app/models/organization.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  updated:      { type: Date, default: Date.now },

  name:         String,
  description:  String,
  location:     String,
  employeeCount: Number
});

module.exports = mongoose.model('Organization', OrganizationSchema);