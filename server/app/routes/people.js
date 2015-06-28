var express = require('express');
var router = express.Router();
var Person = require('../models/person')

var http = require('http')

/* API calls for persons */
router.route('/people')

  // CREATE a person (POST /api/people)
  .post(function(req, res) {
    var person = new Person();
    person.name = req.body.name;
    person.headline = req.body.headline;
    person.summary = req.body.summary;
    person.location = req.body.location;
    person.age = req.body.age;

    console.log('Age: ' + req.body.age);
    console.log('Node Body ' + req.body)
    person.imgUrl = req.body.imgUrl;

    person.positions = [req.body.position];
    person.universities = [req.body.university];

    person.save(function(err) {
      if(err) {
        res.send(err);
      } else {
        res.json({message: 'Person Created', person: person});
      }
    });
  })

  .get(function(req, res) {
    Person.find()

  });

module.exports = router;