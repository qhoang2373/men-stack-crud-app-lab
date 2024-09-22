//===============inputs================//
require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const morgan = require('morgan');
const Car = require('./models/car.js');


//===============Mongoose================//

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

//===============Middleware=================//

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
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

app.get("/cars/:carId", async(req,res) => {
    const foundCar = await Car.findById(req.params.carId);
    res.render("Cars/show.ejs", {car: foundCar});
})

app.get('/cars/:carId/edit', async(req,res) => {
    const foundCar = await Car.findById(req.params.carId);
    res.render('Cars/edit.ejs', { 
        car: foundCar });
});

app.put('/cars/:carId', async(req,res) => {
    if(req.body.isFast === 'on') {
        req.body.isFast = true
    } else {
        req.body.isFast = false
    }
    await Car.findByIdAndUpdate(req.params.carId, req.body);
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