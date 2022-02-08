const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batteryschema = new Schema({
    email:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        minlength:10,
        required:true
    },
    carmodel:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});

const battery = mongoose.model('Battery',batteryschema,'battery');
module.exports = battery;