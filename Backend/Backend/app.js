// start with express
const express= require('express')
// start mongoose 
const mongoose = require('mongoose')


// use fs module to load modules with their relative path
const fs = require('fs');

// use body parser
const bodyParser = require("body-parser")

// use a cors module to enable connecting from any other environment to this API using the url(localhost:4000)
var cors = require('cors')

// contact Router
const contactRouter=require('./routes/contact_routes')

// user Router
const userRouter=require('./routes/user_routes')

//-------------------------------------------------------------------

// an instance from express object
const app = express();

// body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//enabling the cors options
// using cors middleware
app.use(cors());

app.options('*', cors());


// Middleware

app.use('/contact',contactRouter);

app.use('/user',userRouter)







mongoose.connect("mongodb+srv://dbuser:dbuser@cluster0.ush49.mongodb.net/test",{
useUnifiedTopology: true,
useNewUrlParser: true,
useCreateIndex:true

})

// use fs to select the files of modles
var modelFiles = fs.readdirSync(__dirname + "/models/");
modelFiles.forEach((file) => {
    require(__dirname + "/models/" + file);
});


// ----------------------------------------------------

// listen on port 4000
app.listen(4000, () => {
    console.log("server is running successfully on port 4000")
})