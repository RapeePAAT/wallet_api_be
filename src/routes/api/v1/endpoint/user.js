
//user.js
const {Router}  =require('express')
const router=  Router();
const {User} = require('../../../../models/model')
const {getAllUser , getOneUser  , updateUser , deleteUser} = require('../../../../controllers/userController')
const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware');

router.get('/' ,authenicationToken , onlyAdiminMiddleWare , getAllUser)
router.get('/:id',authenicationToken,  getOneUser)
router.put('/:id',authenicationToken,  updateUser)
router.delete('/:id',authenicationToken,onlyAdiminMiddleWare, deleteUser )


module.exports = router;