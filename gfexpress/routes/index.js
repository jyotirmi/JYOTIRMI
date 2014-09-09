var express = require('express');
var router = express.Router();
var db = require('../app/database');
var at = require('../app/activity');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET users page. */
router.get('/users', function(req, res) {
  db.getUsers(function(err,rows){

    res.render('users', { page_title:"Users - list", users: rows });
  });
});


/* GET users page. */
router.get('/users/add', function(req, res) {

    res.render('addUser',{page_title:"Users - Add"});

});


/* save users page. */
router.post('/users/add', function(req, res) {

  //var str = JSON.stringify(req.body, undefined, 2)
  //var data = JSON.parse(str);
  var request = req.body;
  console.log("body is " + request);
  console.log("parsed is " + req.param('firstname'));

  var input = {

    firstname : req.param('firstname'),
    lastname : req.param('lastname'),
    email : req.param('email'),
    username : req.param('username')
  };


  db.saveUser(input, function(err,rows){
    if(err){
      res.render('error');
    }
  });
  res.redirect('/users');
});

/*Edit User*/

router.post('/users/edit', function(req, res) {

  //var str = JSON.stringify(req.body, undefined, 2)
  //var data = JSON.parse(str);
  var request = req.body;
  console.log("body is " + request);
  console.log("parsed is " + req.param('firstname'));

  var input = {
    id : req.param('id'),
    firstname : req.param('firstname'),
    lastname : req.param('lastname'),
    email : req.param('email'),
    username : req.param('username')
  };


  db.editUser(input, function(err,rows){
    if(err){
      res.render('error');
    }
  });
  res.redirect('/users');
});


/* GET users page. */
router.get('/activities', function(req, res) {
  at.listActivities(function(err,rows){

    res.render('activity', { page_title:"Activities", activities: rows });
  });
});

/* Add activity page. */
router.get('/activities/add', function(req, res) {

    res.render('addActivity', { page_title:"Activity - Create New"  });

});

/* GET users page. */
router.get('/activities/:id', function(req, res) {
  var id = req.param('id');
  at.getActivityById(id, function(err,rows){

    res.render('viewActivity', { page_title:"Activities", row: rows });
  });
});


/* Save activity page. */
router.post('/activities/add', function(req, res) {

    var input = {
      activity_name : req.param('activity_name'),
      description : req.param('description'),
      location : req.param('location'),
      schedule : req.param('schedule'),
      min_needed : req.param('min_needed'),
      capacity : req.param('capacity'),
      owner: req.param('owner')

    };
    at.saveActivity(input, function(err,rows){
      if(err){
        res.render('error saving activity');
      }
    });
    res.redirect('/activities');


});

module.exports = router;
