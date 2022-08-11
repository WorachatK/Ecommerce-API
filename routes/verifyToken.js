const jwt = require("jsonwebtoken")

//CHECK JWT_SEC
const verifytoken = (req,res,next)=>{
    const authHeader = req.headers.token
    console.log(authHeader.split(" ")[1]);
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err)res.status(403).json("Token is not valid")
            req.user = user
            next()
        })
    }else{
        return res.status(401).json("You are not authentication")
    }
}


const verifyTokenAndAuthorization = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alowed to do!")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not alowed to do!")
        }
    })
}

module.exports = { verifytoken,verifyTokenAndAuthorization,verifyTokenAndAdmin }