const router = require('express').Router();
const User  =require('../models/user');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Validation schema
const  SchemaUser=Joi.object({
username:Joi.string(),
email: Joi.string().email().required(),
password: Joi.string().min(4).required(),
});


//Register a new User 
router.post("/register", async(req,res)=>{
    //call validation
    const validation= SchemaUser.validate(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    //hash password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    let user = new User({
        username:req.body.username,
        email:req.body.email,
        password: hashedPassword,
    });
    try{
        user= await user.save();
        res.send(user);

    } catch (error) {
        res.status(400).send(error.message);

    }

});

//Login User 
router.post("/login", async(req,res)=>{
    // call validation
    const validation = SchemaUser.validate(req.body);
    if (validation.error)
    return  res.status(400).send(validation.error.details[0].message);
    //check if email exists in database
const user= await User.findOne({ email: req.body.email});
if (!user) return res.sendStatus(400).send("User does not Exist")

// verify password
const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send("Invalid password!")

//create token 
const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET);
res.header("auth-token",token).send(token);
res.status("Logged In");
});
module.exports=router;