var express = require('express');
var router = express.Router();
var Person = require('../models/organization')

/* API calls for persons */
router.route('/organizations')

  // CREATE a person (POST /api/organizations)
  .post(function(req, res) {
    var organization = new Organization();
    organization.name = req.body.name;
    organization.description = req.body.description;
    organization.location = req.body.location;
    organization.employeeCount = req.body.employeeCount;
  })

  .get(function(req, res) {

  });

module.exports = router;