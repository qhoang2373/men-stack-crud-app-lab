//===============inputs================//
require('dotenv').config()
const express = require('express');
const app = express ();
const mongoose = require("mongoose");
const car = require('./models/car.js');


//===============Mongoose================//

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDb')
})

//===============Middleware================//

//===============Routes================//

app.get("/", async (req,res) => {
    res.render('index.ejs')
});

app.get('/new', (req,res) => {
    res.render("new.ejs")
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });