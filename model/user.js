const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    email:{
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
    },
    battery:Array,
    checkup:Array,
    service:Array
});

const user = mongoose.model('User',userschema,'user');
module.exports = user;