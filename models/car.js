const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: String,
    model: String,
    make: String,
    isFast: Boolean
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;