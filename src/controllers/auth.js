const {User} = require('../models/model')

const register = async(req,res)=>{

    try {
    const user  = await User.findOne({where:{email:req.body.email}})
    console.log(user)

    if(user){   
        res.json({ message:'email has alredy exit' })

    }   else{
        
        await User.create({
            username :req.body.name ,
            password :req.body.password , 
            email:req.body.email , 
            tel : req.body.tel ||null 
        });
        res.status(201).json({message:'create success'})
    }
    
    } 
    catch(error){
        res.json({message:error })
    }
  

}

module.exports = {register}