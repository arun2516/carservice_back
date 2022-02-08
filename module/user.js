const user = require("../model/user");
const admin = require("../model/admin");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const brcypt = require("bcryptjs")

exports.signin = async(req,res)=>{
    const schema = joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        mobileno:joi.number().min(10).required()
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    var exituser = await user.findOne({'email':req.body.email}).exec();
    var response=[req.body.email]
    if(exituser){
    var token  = jwt.sign({exituser},process.env.SECRETKEY,{expiresIn:"1hr"});
    response.push(token);
    res.send(response);
   
   }else{
        const User = new user({
            name:req.body.name,
            email:req.body.email,
            mobileno:req.body.mobileno
        })
        await User.save();
        var token = jwt.sign({User},process.env.SECRETKEY,{expiresIn:"1hr"});
        response.push(token)
        res.send(response);
    }


}

exports.userdata = async(req,res)=>{
    
        var response = await user.find();
        res.send(response)
    
    
}

exports.adminsignup = async(req,res)=>{
    const schema = joi.object({
      
        email:joi.string().required(),
        password:joi.string().min(8).required(),

    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});
    var exituser = await admin.findOne({'email':req.body.email}).exec();
    if(exituser) return res.status(400).send({msg:"email already exists"});
    const salt = await brcypt.genSaltSync(10);
    req.body.password  = await brcypt.hashSync(req.body.password,salt);

    const Admin = new admin({
        email:req.body.email,
        password:req.body.password
    })

    var response = await Admin.save();
    res.send(response);
}

exports.adminsignin = async(req,res)=>{
    const schema = joi.object({
        email:joi.string().required(),
        password:joi.string().min(8).required(),
    })
    var {error} = await schema.validate(req.body);
    if(error) return res.status(400).send({msg:error.details[0].message});

    const exituser = await admin.findOne({"email":req.body.email}).exec();
    if(!exituser) return res.status(400).send({msg:"email not registered as admin"});

    const isvalid = await brcypt.compareSync(req.body.password,exituser.password);
    if(!isvalid) return res.status(400).send({msg:"password doesnt match"});

     // generate token
     var token  = jwt.sign({exituser},process.env.ADMINSECRETKEY,{expiresIn:"1800s"});
     res.send(token);

}