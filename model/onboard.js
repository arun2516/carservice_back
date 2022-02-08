const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onboardschema = new Schema({
    address:{
        type:String,
        required:true
    },
    mobileno:{
        type:Number,
        minlength:10,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const onboard = mongoose.model('Onboard',onboardschema,'onboard');
module.exports = onboard;