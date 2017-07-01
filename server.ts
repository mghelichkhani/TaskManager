let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let port = 3000;
let server = app.listen(port, function() {console.log('Express Initialized on Port', port);});
let routes = require('./routes/route');
let mockData = require('./db/data.json');
let db = require('./db/db');

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Using Headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Defining Routes
app.use('/api/v1.0', routes);

// Pushing Random Data on a Random Interval
function pushRandomTask() {
    var mockObject = mockData.pop();
    
    var newTask = {
        'id' : mockObject.id,
        'createdAt' : mockObject.createdAt,
        'updatedAt' : mockObject.createdAt,
        'dueDate' : mockObject.dueDate,
        'resolvedAt' : null,
        'title' : mockObject.title,
        'description' : mockObject.description,
        'priority' : mockObject.priority,
        'status' : mockObject.status
    };

    db.tasks.push(newTask);
}

(function loop() {
    var interval = Math.floor(Math.random() * 15000) + 1000;
    setTimeout(function() {
            pushRandomTask();
            loop();
    }, interval);
}());