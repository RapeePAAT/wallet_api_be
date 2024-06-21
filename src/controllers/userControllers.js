const { where } = require('sequelize');
const { User } = require('../models/model');




const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll()
        if (users) {
            res.status(200)
                .json({
                    data: users
                })
        }
        else {
            res.status(404)
                .json({
                    message: "user not found"
                })
        }

    } catch (e) {
        res
            .status(500)
            .json({
                message: e
            })
    }
}

const getOneUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            res.status(200).json({ status: true, data: user })
        }
        else {
            res.status(404).json({ status: false, message: 'user not found' })
        }

    }
    catch (e) {
        res.status(500).json({ status: false, message: error })
    }
}
const updateUser = async (req, res) => {
    try {
        const { username, password, email, tel } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            await User.update({
                username : username , 
                password: password ,
                email: email , 
                tel:tel 
            }, 
            {
            where: { id: req.params.id }
        })
        res.status(200).json({ status: true, message: "user update complete" });

        }
        else {
        res.status(404).json({ message: 'User not found' });}
}
    catch (error) {
     res.status(500).json({ message: "user not found" });
}
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.destroy()
            res.status(200).json({ status: true, message: "delete complete" })
        }
        else {
            return res.status(404).json({ status: false, message: "user  not found" })
        }
    } catch (e) {
        return res.status(500).json({ status: false, message: error })
    }
}
module.exports = { getAllUser, getOneUser, updateUser, deleteUser }