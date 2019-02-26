const router = require('./router/routes')
var express = require('express')
var bodyParser = require('body-parser')
// Configuring the database
const dbConfig = require('./config/config');
const mongoose = require('mongoose');

//const mongoose = require('mongoose');
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use('/', router);
app.use(express.static('../client'))

require('dotenv').config()
mongoose.Promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000,()=>{

console.log("server is connected");

 
})