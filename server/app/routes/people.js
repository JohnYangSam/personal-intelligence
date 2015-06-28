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
    // /api/people?name=<name>
    // http://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params
    console.log("Name Param:" + req.query.name)
    if (req.query.name) {
      Person.findOne({name: req.query.name}, function(err, person) {
        if(err) {
          res.send(err)
        } else {
          if(person) {
            res.json(person)
          } else {
            res.json({})
          }
        }
      });
    } else {
      // Find all people
      Person.find(function(err, people) {
        if(err) {
          res.send(err)
        } else {
          res.json(people);
        } 
      });
    }
  });

module.exports = router;