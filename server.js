const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const devuser = require("./devusermodel");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");

const app = express();

mongoose.connect("mongodb://localhost:27017").then( () => {
    console.log("DB Connected")
})

app.use(express.json());
app.use(cors(
    origin = "*"
))


app.get('/',(req,res) => {
    res.send("Hello, world !!")
})

app.post('/register',async(req,res) => {
    try {
        const {username,email,password,confirmpassword} = req.body;
        const exist = await devuser.findOne({email});
        if(exist){
            res.status(403).send("User Already Existed !!")
        } else if(password !== confirmpassword){
            res.status(403).send("Passwords not Matching !!")
        } else{
            const newUser = await devuser({
                username,email,password,confirmpassword
            })
            newUser.save();
            return res.status(200).send("Registered successfully !!")
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error !!");
    }
})

app.post('/login',async(req,res) => {
    try {
        const {email,password} = req.body;
        const exist = await devuser.findOne({email});
        if(!exist){
            return res.status(404).send("User not Found !!");
        } else if(exist.password !== password){
            return res.status(403).send("Incorrect Password !!")
        } else {
            const payload = {
                user : {
                    id : exist.id
                }
            }
            jwt.sign(payload,"jwtsecure",{expiresIn:3600000},
                (err,token) => {
                    if (err) throw err;
                    return res.json({token})
                }
            )
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error !!")
    }
})

app.get('/home',middleware,async(req,res) => {
    try {
        let exist = await devuser.findById(req.user.id);
        if(!exist){
            return res.status(404).send("token not found!!");
        } else {
            res.json(exist);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error !!")
    }
})

app.get('/profile',middleware,async(req,res) => {
    try {
        let exist = await devuser.findById(req.user.id);
        let exist1 = await consumermodel.findOne(req.user.email);
        if(!exist){
            return res.status(404).send("User not register yet!!")
        } else if (exist.email !== exist1.email) {
            return res.status(404).send("Users are different !!")
        } else {
            res.json(exist1)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server Error !!")
    }
})


app.listen(5000, () => {
      console.log("Server running..")
})