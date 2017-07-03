var express = require('express');
var _ = require('lodash');
var router = express.Router();
var db = require('../db/db');


// Fetch All Tasks
router.get('/tasks', function(req, res, next) {
  res.json(db.tasks);
});

// Fetch Task
router.get('/task/:id', function(req, res, next) {
  var task = _.find(db.tasks, {'id': req.params.id});
  res.json(task)
});

// Save Task
router.post('/task', function(req, res, next) {
  var task = req.body;
  if(!task) {
    res.status(400);
    res.json({
      "error": "Nothing Posted"
    });
  } else {
    db.tasks.push(task);
  }
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
  var task = _.remove(db.tasks, {'id': req.params.id});
  res.json(task);
});

// UpSert Task
router.put('/task/:id', function(req, res, next) {
  var task = req.body;
  var match = _.find(db.tasks, {'id': req.params.id});
    if(match){
        var index = _.indexOf(db.tasks, _.find(db.tasks, {'id': req.params.id}));
        db.tasks.splice(index, 1, task);
    } else {
        db.tasks.push(task);
    }
});

module.exports = router;
