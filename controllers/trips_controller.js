var Trip  = require('../models/Trip');
var express = require('express');
var router  = express.Router();
var isAuthenticated = require("../config/middleware/isAuthenticated");


router.get('/', isAuthenticated, function(req, res) {

	Trip
  .find()
  .where('UserId').equals(req.user.id)
  .then(function(dbTrip) {
	  console.log(dbTrip);
    res.render('trips/trips', {
		  layout: 'main-trips',
		  trip: dbTrip
	  });
  });
});

router.post('/new', isAuthenticated, function(req, res) {

	// Add id from User onto req.body
	req.body.UserId = req.user.id;

  var newTrip = new Trip();
  newTrip.save(req.body).then(function(dbPost) {
    res.json(dbPost);
  });
});

module.exports = router;
