
//user.js
const {Router}  =require('express')
const router=  Router();
const {User} = require('../../../../models/model')
const {getAllUser , getOneUser  , updateUser , deleteUser} = require('../../../../controllers/userControllers')


router.get('/', getAllUser)
router.get('/:id', getOneUser)
router.put('/:id', updateUser)
router.delete('/:id',deleteUser )


module.exports = router;