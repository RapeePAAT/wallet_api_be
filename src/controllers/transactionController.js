const { where, Op } = require('sequelize')
const {User ,Wallet , ExchangeRate , Cryptocurrency  , DigitalAsset ,Transaction} = require('../models/model')


const getAllTransaction = async (req,res)=>{
    try{
        const transaction = await Transaction.findAll()
        if(!transaction){
            return res.status(404).json({status:false , message:"Data is Empty"})
        }  
        else{
            return res.status(200).json({status:true , data :transaction})
        }

    }catch(e){
        return res.status(500).json({status:false , message:"Some thing Wrong" ,details :e.message})
    }
}
const getTransactionById = async (req,res)=>{
    try{
        const transaciion = await Transaction.findByPk(req.params.id)
        if (!transaciion){
            return res.status(404).json({status :false , message :"Transaciton not found"})
        }
        else{
            return res.status(200).json({status:true , data: transaciion})
        }
    }catch(e){
        return res.status(500).json({status:false , message:"Some thing Wrong" ,details :e.message})

    }
}
const getTransactionByUser = async(req,res)=>{
    try{
        const transaciion = await Transaction.findAll({
            where:{
                [Op.or]:[
                    {from_user_id:req.user.user_id} , 
                    {to_user_id:req.user.user_id}
                ]
            }
        })
        if(!transaciion){
            return res.status(200).json({status:true , message:"you not have Transaction"})
        }
        else{
            return res.status(200).json({status:true , data:transaciion})
        }
    }catch(e){
        return res.status(500).json({status:false , message:"Some thing Wrong" ,details :e.message})
    }
}
const createTransaction = async (req, res) => {
    try {
        const { to_user_id, from_cryptocurrency_id, to_cryptocurrency_id, amount } = req.body;

        // Fetch all necessary data in parallel
        const [ToUser, FromCryptoId, ToCryptoId, fromWallet, toWallet] = await Promise.all([
            User.findByPk(to_user_id),
            Cryptocurrency.findByPk(from_cryptocurrency_id),
            Cryptocurrency.findByPk(to_cryptocurrency_id),
            Wallet.findOne({ where: { user_id: req.user.user_id, cryptocurrency_id: from_cryptocurrency_id } }),
            Wallet.findOne({ where: { user_id: to_user_id, cryptocurrency_id: to_cryptocurrency_id } })
        ]);

        if (!ToUser) {
            return res.status(404).json({ status: false, message: "To User not found" });
        }
        if (!FromCryptoId) {
            return res.status(404).json({ status: false, message: "From Crypto not found" });
        }
        if (!ToCryptoId) {
            return res.status(404).json({ status: false, message: "To Crypto not found" });
        }

        if (FromCryptoId.id === ToCryptoId.id) {
            if (!fromWallet) {
                return res.status(400).json({ status: false, message: "From wallet not found" });
            }
            if (!toWallet) {
                return res.status(400).json({ status: false, message: "To wallet not found" });
            }
            if (fromWallet.amount < amount) {
                return res.status(400).json({ status: false, message: "Insufficient funds" });
            }

            // Perform transaction
            fromWallet.amount -= amount;
            toWallet.amount += amount;

            const [fromWalletSuccess, toWalletSuccess] = await Promise.all([
                fromWallet.save(),
                toWallet.save()
            ]);

            if (fromWalletSuccess && toWalletSuccess) {
                const transaction = await Transaction.create({
                    from_user_id: req.user.user_id,
                    to_user_id: to_user_id,
                    from_cryptocurrency_id,
                    to_cryptocurrency_id,
                    rate: 1,
                    amount,
                });

                if (transaction) {
                    return res.status(200).json({ status: true, message: "Transaction created successfully" });
                } else {
                    return res.status(400).json({ status: false, message: "Failed to create transaction" });
                }
            } else {
                return res.status(400).json({ status: false, message: "Failed to update wallets" });
            }
        } else {
            return res.status(400).json({ status: false, message: "Cryptocurrencies do not match" });
        }
    } catch (e) {
        return res.status(500).json({ status: false, message: "Something went wrong", details: e.message });
    }
};
// const updateTransactions = async (req,res)=>{
//     try{
//         const transaciion = await Transaction.findByPk(req.params.id)
//         if(!transaciion){
//             return res.status(404).json({status :false , message :"Transaciton not found"})
//         }
//         else{
//             Transaction.update({

//             },{
//                 where:{id :req.parmas.id}
//             })
//         }
//     }catch(e){
//         return res.status(500).json({status:false , message:"Some thing Wrong" ,details :e.message})

//     }
// }
const deleteTransaction = async (req,res)=>{
    try{
        const transaciion = await Transaction.findByPk(req.params.id)
        if(!transaciion){
            return res.status(404).json({status :false , message :"Transaciton not found"})
 
        }
        else{
            transaciion.destroy()
            return res.status(200).json({status:false , message:"delete success"})
        }
    }catch(e){
        return res.status(500).json({status:false , message:"Some thing Wrong" ,details :e.message})
    }
}
module.exports = {getAllTransaction , getTransactionById, getTransactionByUser , createTransaction , deleteTransaction}