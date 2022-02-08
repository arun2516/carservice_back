const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceschema = new Schema({
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

const service = mongoose.model('Service',serviceschema,'service');
module.exports = service;