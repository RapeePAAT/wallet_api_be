
const jwt = require('jsonwebtoken')

const secrectKey = process.env.SECREATE_KEY
const {User} = require('../models/model')


const authenicationToken = (req,res,next)=>{
const authHeader  = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (token  == null){
    return res.status(401).json({status:false , message:"Unauthorized"})
}
    jwt.verify(token , secrectKey , (err , user)=>{
        if(err){
            return res.status(403).json({status:false , message:"Forbidden"})
        }
        req.user = user ; 
        next() ;
    })
}

// เฉพาะ admin
const onlyAdiminMiddleWare = async (req,res , next)=>{
    const user = await User.findByPk(req.user.user_id);
    if(user == null){
        return res.status(404).json({mesage:'user not found'})
    }else{

        if(user.role === "admin"){
            next()
        }
        else{
            return res.status(403).json({message:'no permision'})
        }
    }
} 



module.exports = {authenicationToken , onlyAdiminMiddleWare }