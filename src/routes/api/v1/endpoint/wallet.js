const {Router} = require ('express')

const router = Router()
//middle ware
const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware')
//controller
const {getAllWallet ,getAllWalletByUser , getWalletById ,getAllWalletByUserId,createWallet ,updateWalletByid , deleteWallete} = require('../../../../controllers/walletController')


router.get('/',authenicationToken, onlyAdiminMiddleWare , getAllWallet);  // only admin
router.get('/user' ,authenicationToken ,getAllWalletByUser ); //by user
router.get('/user/:id',authenicationToken,onlyAdiminMiddleWare, getAllWalletByUserId); // only admin
router.get('/:id',authenicationToken, onlyAdiminMiddleWare, getWalletById);//only admin
router.post('/',authenicationToken ,createWallet);// user or admin
router.put('/:id' ,authenicationToken  , updateWalletByid); // user or admin 
router.delete('/:id' ,authenicationToken ,deleteWallete) ;  //user or admin

module.exports = router  