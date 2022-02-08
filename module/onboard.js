const onboard = require("../model/onboard");
const joi = require("joi");
const jwt = require("jsonwebtoken");


exports.onboard = async(req,res)=>{
    const schema = joi.object({
        name:joi.string().required(),
        address:joi.string().required(),
        mobileno:joi.number().min(10).required()
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

   
        const Onboard = new onboard({
            name:req.body.name,
            address:req.body.address,
            mobileno:req.body.mobileno
        })
        const response = await Onboard.save();
       
        res.send(response);
    


}