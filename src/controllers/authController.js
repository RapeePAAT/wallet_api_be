const { User } = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secrectKey = process.env.SECREATE_KEY
const register = async (req, res) => {

    try {
        //ปัญหาเกิดที่ Email
        const user = await User.findOne({ where: { email: req.body.email } })

        if (user) {
            res.json({ message: 'email has alredy exit' })

        } else {

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            await User.create({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email|| null,
                tel: req.body.tel || null , 
                role:req.body.role
            });
            res.status(201).json({ message: 'register success' })
        }

    }
    catch (error) {
        res.json({ message: error })
    }


}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            return res.status(401).json({ status: false, message: "Username or password worng" })

        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ status: false, message: "Wrong Password" })
        }

        const accessToken = jwt.sign({ user_id: user.id }, secrectKey, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN })
        const refreshToken = jwt.sign({ user_id: user.id }, secrectKey, { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN })
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken })

    }catch(e){
        res.status(500).json({status:false , message:"some thing wrong" ,details:e.mesage})
    }


}

module.exports = { register  , login}