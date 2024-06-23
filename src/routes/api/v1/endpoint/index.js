const {Router} = require('express')
const router = Router()

router.use('/auth' , require('./auth/auth'))
router.use('/user', require('./user'))
router.use('/cryptocurrency' , require('./cryptocurrency'))
router.use('/wallet' , require('./wallet'))
router.use('/digitalassets' , require('./digitalasset'))
router.use('/exchangerate', require('./exchange'))


module.exports = router ; 