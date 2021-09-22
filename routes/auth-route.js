const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validations = require('../middlewares/validations');

const User = require("../models/User");

router.post('/login', validations.validateLogin, async (req,res)=>{
    let user = await User.getUser(req.body.email);
    if(user) 
    {
        if(bcrypt.compareSync(req.body.password, user.password)) 
        {
            let token = jwt.sign({email: user.email},'dogeiskey', {expiresIn: '24h'})
            // res.cookie('token', token)
            // res.cookie('tokenS', token, {signed: true})
            // res.redirect('/')
            res.status(200).send({ token: token })
        }
        else
        {
            res.status(401).send({error: "Wrong password."})
        }
    }
    else
    {
        res.status(404).send("User not found.")
    }
})

router.get('/logout',(req,res)=>{})

module.exports = router;