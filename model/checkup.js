const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkupschema = new Schema({
    carregyr:{
        type:String,
        required:true
    },
    odo:{
        type:Number,
        minlength:10,
        required:true
    },
    carregno:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    }
});

const checkup = mongoose.model('Checkup',checkupschema,'checkup');
module.exports = checkup;