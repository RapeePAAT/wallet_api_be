
const { User , Cryptocurrency , Wallet } = require('../models/model');

const getAllWallet = async (req, res)=>{
    try {
        const wallet = await Wallet.findAll({include:[{model:User},{model:Cryptocurrency}]}) 
        if(!wallet){
            return res.staus(404).json({status:false , message:"empty data"})
        }else{
            return res.status(200).json({status:true  , data :wallet})
        }
    }catch(e){

        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})
    }

} //only admin
const getWalletById = async (req ,res)=>{
    
    try{
        const wallet =await Wallet.findByPk(req.params.id , {include:[{model:User} ,{model:Cryptocurrency}]})
        if (!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})
        }else{
            return res.status(200).json({status:true  , data :wallet})

        }

    }catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    }

}

//user 
const getAllWalletByUser =async (req,res)=>{
    try{
        console.log(req.user)
        const wallet = await Wallet.findAll({include:[{model:User},{model:Cryptocurrency}]})
        if(!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})

        }
        else{
            return res.status(200).json({status:true  , data :wallet})
        }

    }catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    }

} // only admin
const getAllWalletByUserId =async (req,res)=>{
    try{
        const wallet = await Wallet.findAll({where:{user_id :req.params.id} , include:[{model:User} , {model:Cryptocurrency}]})
        if(!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})

        }else{
            return res.status(200).json({status:true  , data :wallet})

        }

    }catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    } 
} 

const createWallet = async(req,res)=>{


    try{
        const {cryptocurrency_id , amount} = req.body
        const crypto = await Cryptocurrency.findByPk(cryptocurrency_id)
        if(!crypto){
            return res.status(404).json({status: false  , message: 'Cryptocurrency not found'})

        }else{
            Wallet.create({
                user_id:req.user.user_id, 
                cryptocurrency_id:cryptocurrency_id,
                amount:amount
            })
            return res.status(201).json({staus:true , message:"create Success"})
        }


    }catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    }

}
const updateWalletByid = async(req ,res)=>{
    try{
         const  wallet = await Wallet.findByPk(req.params.id) ; 
         if(!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})
         }
         else{
            Wallet.update({
                amount: req.body.amount  , 
                update_at : new Date()
            },{
                where:{id:req.params.id}
            })
            return res.status(200).json({status:true , message :"update succes"})
         }
    }catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})
    }
    
}

const deleteWallete = async (req, res)=>{
    try{
        const wallet = await Wallet.findByPk(req.params.id)
        if(!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})
        }
        else{
            wallet.destroy()
            return res.status(200).json({status:true , message :"delete succes"})

        }
    }
    catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    }
}

module.exports = {getAllWallet ,getAllWalletByUser , getWalletById ,getAllWalletByUserId,createWallet , updateWalletByid , deleteWallete} 