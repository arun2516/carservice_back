const battery = require("../model/battery");
const user = require("../model/user")
const joi = require("joi");



exports.battery = async(req,res)=>{
    const schema = joi.object({
        carmodel:joi.string().required(),
        email:joi.string().email().required(),
        mobileno:joi.number().min(10).required(),
        address:joi.string().required()
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    var exituser = await user.findOne({'email':req.body.email}).exec();
    if(exituser){
        const us = await user.findOneAndUpdate({'email':req.body.email }, {$push:{battery:{"carmodel":req.body.carmodel,"email":req.body.email,"mobileno":req.body.mobileno, "address":req.body.address}}})
        res.send(us);
    }else{
   
    const Battery = new battery({
            carmodel:req.body.carmodel,
            email:req.body.email,
            mobileno:req.body.mobileno,
            address:req.body.address
        })
        const resp = await Battery.save();
        res.send(resp);
    }
        
    


}