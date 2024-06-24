
const { User , Cryptocurrency , Wallet, DigitalAsset } = require('../models/model');

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
        const [crypto , digitalData] = await Promise.all([
            Cryptocurrency.findByPk(cryptocurrency_id),
            DigitalAsset.findOne({where:{cryptocurrency_id:cryptocurrency_id}})
        ])
        if(!crypto){
            return res.status(404).json({status: false  , message: 'Cryptocurrency not found'})

        }
        if(!digitalData){
            return res.status(404).json({status:false , message:"Digital Assets not found"})
        }
        if(digitalData.balance <amount){
            return res.status(400).json({status:false , message:"Sry my digital not have to tranfer"})
        }
        digitalData.balance-= amount ; 

        const digtaldataSuccess = await digitalData.save() 
        if(digtaldataSuccess){
            Wallet.create({
                user_id:req.user.user_id, 
                cryptocurrency_id:cryptocurrency_id,
                amount:amount
            })
            return res.status(201).json({staus:true , message:"create Success"})
        }
        else{
            return res.status(400).json({staus:false , message :"can't tranger with digital balanve"})
        }
            
        

    
    }
    catch(e){
        return   res.status(500).json({staus:false  , message :"something wrong" , details :e.message})

    }

}
const updateWalletByid = async(req ,res)=>{
    try{
        ; 
         const [wallet , digitalData] = await Promise.all([
            Wallet.findByPk(req.params.id),
            DigitalAsset.findOne({where:{cryptocurrency_id:req.body.cryptocurrency_id}})
        ])
         if(!wallet){
            return res.status(404).json({status: false  , message: 'items not found'})
         }
         if(!digitalData){
            return res.status(404).json({status:false  , mesasge:"Dital Wallet at my server not found"})
         }
         digitalData.balance-=req.body.amount
         wallet.amount+=req.body.amount

         const [digitalSuccess , walletSucess ] = await Promise.all([
             digitalData.save(),
             wallet.save()
         ])
        
        if(!digitalSuccess){
            return res.status(400).json({status:false  , message:"can't tranfer balance "})
        }
        if(!walletSucess){
            return res.status(400).json({status:false  , message:"can't tranfer wallet "})
        }   
        return res.status(200).json({status:true , message :"update succes"})
         
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