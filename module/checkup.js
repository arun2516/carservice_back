const checkup = require("../model/checkup")
const user = require("../model/user")
const joi = require("joi");



exports.checkup = async(req,res)=>{
    const schema = joi.object({
        carregyr:joi.string().required(),
        odo:joi.string().required(),
        carregno:joi.string().required(),
        name:joi.string().required(),
        email:joi.string().email().required(),
        address:joi.string().required(),
        landmark:joi.string().required()
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    var exituser = await user.findOne({'email':req.body.email}).exec();
    if(exituser){
        const us = await user.findOneAndUpdate({'email':req.body.email }, {$push:{checkup:{"carregyr":req.body.carregyr,"email":req.body.email,"odo":req.body.odo, "address":req.body.address, "carregno":req.body.carregno,"name":req.body.name, "landmark":req.body.landmark}}})
        res.send(us);
    }else{
   
    const Checkup = new checkup({
            carregyr:req.body.carregyr,
            email:req.body.email,
            odo:req.body.odo,
            address:req.body.address,
            carregno:req.body.carregno,
            name:req.body.name,
            landmark:req.body.landmark
        })
        const resp = await Checkup.save();
        res.send(resp);
    }
        
    


}