const {Router} = require('express')
const router  = Router()
const {register}  = require('../../../../../controllers/auth')

router.post('/register' , register)

router.post('/login' , (req,res)=>{ 
    res.json({message:"login"})
    })

module.exports = router ; 
