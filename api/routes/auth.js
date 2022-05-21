const express = require("express");
const router = express.Router();
const User = require("../models/User")
const Crypto = require("crypto-js");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Crypto.AES.encrypt(req.body.password, process.env.SECRECT_KEY).toString(),
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send("Server error")
    }

})



//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("wrong user credentials");
        var bytes = Crypto.AES.decrypt(user.password,process.env.SECRECT_KEY);
        var originalPassword = bytes.toString(Crypto.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("wrong user credentials");
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.SECRECT_KEY,{expiresIn: "5d"});
        const {password,...info} = user._doc;
        res.status(200).json({...info,accessToken});
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})
module.exports = router;