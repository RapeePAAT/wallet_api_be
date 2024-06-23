

const sequelize = require('../models/dbConnect')
const {User , Cryptocurrency , DigitalAsset} = require('../models/model')

const getAllDigitalAssets  = async (req,res)=>{
    try{
        const digitalData = await DigitalAsset.findAll()
        if(!digitalData){
            return res.status(404).json({status:false , message:"data is empty"})
        }
        else{
            return res.status(200).json({staus:true , data :digitalData})
        }

    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})
    }

}
const getDigitalAssetsById = async (req , res)=>{
    try{
        const digitalData = await DigitalAsset.findByPk(req.params.id)
        if(!digitalData){
            return res.status(404).json({status:false , message:"items not found"})
        }
        else{
            return res.status(200).json({staus:true , data :digitalData})
        }
    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})

    }
}
const getDigitalAssetsTotal = async (req , res)=>{
    try{
        const digitalData = await DigitalAsset.findAll({
            attributes:[
                [sequelize.literal('SUM(balance)'), "totalBalance"]
            ]
        })
        if(!digitalData){
            return res.status(400).json({status:false , message :"no data here"})
        }
        else{
            return res.status(200).json({status:true , data : digitalData})
        }

    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})

    }
}
const createDigitalAssets = async (req,res)=>{
    try{

        const cyp = await Cryptocurrency.findByPk(req.body.cryptocurrency_id)
        if(!cyp){
            return res.status(404).json({status:false  , message:"Cryptocurrency not found"})
        }
        
        const digitalData  = await DigitalAsset.create({
            user_id : req.user.user_id, 
            cryptocurrency_id: req.body.cryptocurrency_id , 
            balance:req.body.balance
        })
        if(!digitalData){
            return res.status(400).json({status:false , message :"can't create"})
        }
        return res.status(201).json({staus:true , message:"creaet success"})
    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})

    }

}
const updateDigitalAssets = async (req,res)=>{
    try{
        const digitalData = await DigitalAsset.update({
            balance:req.body.balance,
            update_at : new Date()

        } , {
            where:{
                id:req.params.id
            }
        })
        if (!digitalData){
            return res.status(400).json({staus:false , message:"can't update"})
        }
        else{
            return res.status(200).json({status:true , message:"update success"})
        }

    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})

    }
}
const deleteDigitalAssets = async (req,res)=>{
    try{
        const digitalData  = await DigitalAsset.findByPk(req.params.id)
        if(!digitalData){
            return res.status(404).json({status:false  , message:"items not found"})
        }
        else{
            digitalData.destroy();
            return res.status(200).json({staus:false , message:"delete success"})
        }
    }catch(e){
        return res.status(500).json({status:false , message :"some thing wrong" , details :e.message})

    }
}

module.exports = {getAllDigitalAssets,getDigitalAssetsById, getDigitalAssetsTotal , createDigitalAssets , updateDigitalAssets , deleteDigitalAssets}