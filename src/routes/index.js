const {Router} = require('express')
const router = Router()

router.use('/auth' , require('./auth'))
router.use('/user', require('./user'))
router.use('/cryptocurrency' , require('./cryptocurrency'))
router.use('/wallet' , require('./wallet'))
router.use('/digitalassets' , require('./digitalasset'))
router.use('/exchangerate', require('./exchange'))
router.use('/transaction', require('./transaction'))

module.exports = router ; 