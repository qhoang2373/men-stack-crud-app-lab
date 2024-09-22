//===============inputs================//
require('dotenv').config()
const express = require('express');
const app = express ();
const mongoose = require("mongoose");
const car = require('./models/car.js');
const Car = require('./models/car.js');


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

app.get('/cars/new', (req,res) => {
    res.render("Cars/new.ejs")
});

app.post('/cars', async(req,res) => {
    if (req.body.isFast === 'on'){
        req.body.isFast === true;
    }else {
        req.body.isFast = false;
    }
    await Car.create(req.body);
    res.redirect('/cars')
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
  });