const router = require('./router/routes')
const chatController = require('./controller/chatController')
var express = require('express')
var bodyParser = require('body-parser')
// Configuring the database
const dbConfig = require('./config/config');
const mongoose = require('mongoose');
var app = express();
const http = require('http');
// const server = http.createServer(app);
//const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());
var expressValidator = require('express-validator')
app.use(expressValidator());
var socketIO = require('socket.io');
app.use('/', router);
app.use(express.static('../client'))

require('dotenv').config()
mongoose.Promise = global.Promise;


var server = app.listen(3000, function () {

    console.log("server is connected");

})
const io = require('socket.io')(server);
//Whenever someone connects this gets executed.
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('createMessage', function (message) {
        chatController.message(message, (err, data) => {
            if (err) {
                console.log(err);

            }
            else {
                console.log("message", message);
                io.emit('newMessage', message);
            }
        })

    })
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});
//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



