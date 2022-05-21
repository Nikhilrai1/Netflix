const jwt = require("jsonwebtoken");

function verify(req,res,next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]; // split token
        jwt.verify(token,process.env.SECRECT_KEY,(err,user) => {
            if(err) return res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Please authenticate properly");
    }
}

module.exports = verify;