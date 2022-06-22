const router=require('express').Router();
const Admin =require('../models/admin');
const Joi=require("joi");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");

//validate required admin details
//Regitration validation
const schemaRegister = Joi.object({
username: Joi.string().min(6).required(),
email: Joi.string().email().min(6).required(),
password: Joi.string().min(3).required(),
});
//Login validation
const schemaLogin = Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().required(),
});


//Register a new admin 
router.post('/registerAdmin',async(req,res)=>{
    //call validation schema before registration 
    const validation= schemaRegister.validate(req.body);
    if (validation.error)
    return res.status(400).send(validation.error.details[0].message);
    // verify is the admin already exists
    const emailExists = await Admin.findOne({email: req.body.email});
    if (emailExists) return res.statys(400).send("Email already exists");
    //Hash password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);
// add new admin 

    let admin =new Admin({
        username : req.body.username,
        email: req.body.email,
        password: hashedPassword, 
    });
    try{
        admin= await admin.save();
        return res.send(admin)

    } catch(error) {
    res.sendStatus(400).send(error.message);
    }
});
// Login Admin
router.post("/loginAdmin", async(req,res)=>{
// validation before login 
const validation= schemaLogin.validate(req.body);
if (validation.error) return res.status(400).send(validation.error.details[0].message);

//check if email exists in database
const admin= await Admin.findOne({ email: req.body.email});
if (!admin) return res.sendStatus(400).send("Admin does not Exist")

// verify password
const validPassword = await bcrypt.compare(req.body.password, admin.password);
if (!validPassword) return res.status(400).send("Invalid password!")

//create token 
const token = jwt.sign({_id: admin._id }, process.env.TOKEN_SECRET);
res.header("auth-token",token).send(token);
});



module.exports=router;