
const  {User,Cryptocurrency} = require('../models/model')



const getAllCryptocurrency = async (req,res)=>{

    try{
    const data = await Cryptocurrency.findAll()

    if (data === null){
        res.status(404).json({status:false , message:"coin not found"})
    }
    else {
        res.status(200).json({status:true , data:data})
    }



    }catch(e){
        res.status(500).json({status:false ,message:"some thing worng" , details:e.message})
    }



}
const getCryptocurrencyById = async (req,res)=>{
    try{
        const data  = await Cryptocurrency.findByPk(req.params.id , {include:{model:User}})
        if(data !== null){
            res.status(200).json({status:true ,data:data})
        }
        else{
            res.status(404).json({staus:false , message:"items not found"})
        }

    }catch(e){
        res.status(500).json({status:false ,message:"some thing worng" , details:e.message})

    }

}
const creatCryptocurrency = async (req,res)=>{

    try{
        const data =  await Cryptocurrency.create({
            user_id :req.user.user_id,
            name:req.body.name ,
            symbol:req.body.symbol ,
        })
        if (data !== null){
            res.json({status:true  ,message: "create success"})
        }else{
            return res.status(400).json({status:false , message :"can't create"})
        }


    }catch(e){
        res.status(500).json({status:false  , message:"can't create" , details:e.message})
    }

}
const upateCryptocurrency = async (req,res)=>{

    try{
        const data =await Cryptocurrency.findByPk(req.params.id)
        if(data!==null){
            Cryptocurrency.update({
                user_id :req.user.user_id, 
                name:req.body.name,  
                symbol :req.body.symbol

            },{
                where :{
                    id : req.params.id
                }
            })
            res.status(200).json({status:true , message:"update success"})
        
        }
        else{
            res.status(404).json({status:false , message :"item not found"})
        }

    }catch(e){
        res.status(500).json({status:false  , message:"some thing worng" , details:e.message})

    }
}
const deleteCryptocurrency = async (req,res)=>{
    try{
        const data = await Cryptocurrency.findByPk(req.params.id)
        if (data!== null){
            data.destroy()
            res.status(200).json({status:true , message:"delete success"})
        }
        else{
            return res.status(400).json({status:false , message :"can't delete"})

        }

    }catch(e){
        res.status(500).json({status:false  , message:"some thing worng" , details:e.message})

    }
}

module.exports = { getAllCryptocurrency , getCryptocurrencyById , creatCryptocurrency , upateCryptocurrency , deleteCryptocurrency}