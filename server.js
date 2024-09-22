//===============inputs================//
require('dotenv').config()
const express = require('express');
const app = express ();
const mongoose = require("mongoose");
const Car = require('./models/car.js');
const methodOVerride = require('method-override')
const morgan = require('morgan')


//===============Mongoose================//

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDb')
})

//===============Middleware================//

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

//===============Routes================//

app.get("/", async (req,res) => {
    res.render('index.ejs')
});

app.get("/cars", async(req,res) => {
    const allCars = await Car.find();
    res.render("Cars/carCollection.ejs", {cars: allCars})
})

app.get('/cars/new', (req,res) => {
    res.render("Cars/new.ejs")
});



app.put('/cars/:carId', async(req,res) => {
    if(req.body.isFast === 'on') {
        req.body.isFast = true
    } else {
        req.body.isFast = false
    }
    await Car.findByIdAndUpdate(req.params.foodId, req.body);
    res.redirect('/Cars/${req.params.carId}')
})

app.delete('/cars/:carId', async(req,res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
});

app.post('/cars', async(req, res) => {
    if(req.body.isFast === 'on'){
        req.body.isFast = true
    } else {
        req.body.isFast = false
    }
    await Car.create(req.body)
    res.redirect('/Cars');
});



app.listen(3000, () => {
    console.log("Listening on port 3000");
  });