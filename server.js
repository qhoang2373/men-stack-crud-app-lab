//===============inputs================//
require('dotenv').config()
const express = require('express');
const app = express ();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDb')
})

const Car = require('./models/car.js')


//===============Mongoose================//

//===============Middleware================//

//===============Routes================//

app.get("/test", async (req,res) => {
    res.render('index.ejs')
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
  });