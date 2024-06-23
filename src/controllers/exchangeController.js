const { Model } = require('sequelize');
const  {User , Cryptocurrency , ExchangeRate} = require('../models/model')


const getAllExchangeRate = async (req,res)=>{

    try {
        const exchange = await ExchangeRate.findAll();
        if(!ExchangeRate){
            return res.status(404).json({status:false , message:"Empty Data"})
        }
        else{
            return res.status(200).json({status:true  , data :exchange})
        }
    }catch(e){
        return res.status(500).json({status:false  , message:"some thing wrong" , details:e.message})

    } 


}
const getExchangeRateById = async (req, res) => {
    try {
        const exchange = await ExchangeRate.findByPk(req.params.id, {
        });

        if (!exchange) {
            return res.status(404).json({ status: false, message: "Exchange rate not found" });
        } else {
            return res.status(200).json({ status: true, data: exchange });
        }

    } catch (e) {
        return res.status(500).json({ status: false, message: "Something went wrong", details: e.message });
    }
}
const createExchangeRate = async (req,res)=>{
    try{
        const exchange = await ExchangeRate.create({
            user_id : req.user.user_id , 
            from_cryptocurrency_id:req.body.from_cryptocurrency_id , 
            to_cryptocurrency_id:req.body.to_cryptocurrency_id,
            rate:req.body.rate 
        })
        if(!exchange){
            return res.status(400).json({status:false , message:"can't create"})
        }
        else{
            return res.status(201).json({status:true ,message:"create succeess" })
        }

    }catch(e){
        return res.status(500).json({status:false  , message:"some thing wrong" , details:e.message})

    }
}
const updateExchangeRateById = async (req,res)=>{
    try{
        const exchange = await ExchangeRate.findByPk(req.params.id)
        if(!exchange){
            return res.status(404).json({status:false , message :"item not found"})
        }
        else{
            await ExchangeRate.update({
                rate:req.body.rate,
                update_at : new Date()
            } , {
                where:{
                    id:req.params.id
                }
            })
            res.status(200).json({status:true , message : "update success"})
        }
    }catch(e){
        return res.status(500).json({status:false  , message:"some thing wrong" , details:e.message})

    }
}
const deleteExchangeRateById = async (req,res)=>{
    try{
        const exchange = await ExchangeRate.findByPk(req.params.id)
        if (!exchange){
            return res.status(404).json({status:false ,  message:"Exchange rate not found !"})
        }
        else{
            exchange.destroy() 
            return res.status(200).json({status:true , message:"delete success"})
        }

    }catch(e){
        return res.status(500).json({status:false  , message:"some thing wrong" , details:e.message})
    }

}
module.exports = {getAllExchangeRate , getExchangeRateById , createExchangeRate , updateExchangeRateById ,deleteExchangeRateById}