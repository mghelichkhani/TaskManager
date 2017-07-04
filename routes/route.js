var express = require('express');
var _ = require('lodash');
var router = express.Router();
var db = require('../db/db');
var uuidv4 = require('uuid/v4');

// Fetch All Tasks
router.get('/tasks', function(req, res, next) {
  res.json(db.tasks);
});

// Fetch Task
router.get('/task/:id', function(req, res, next) {
  var task = _.find(db.tasks, {'id': req.params.id});
  res.json(task)
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
  var task = _.remove(db.tasks, {'id': req.params.id});
  res.json(task);
});

// Save/Update Task
router.put('/task/:id', function(req, res, next) {
  var task = req.body;
  var match = _.find(db.tasks, {'id': req.params.id});
    if(match){
        var index = _.indexOf(db.tasks, _.find(db.tasks, {'id': req.params.id}));
        db.tasks.splice(index, 1, task);
    } else {
        task.id = uuidv4();
        db.tasks.push(task);
    }
});

module.exports = router;
