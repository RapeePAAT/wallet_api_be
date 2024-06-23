const {Router} = require('express')

const router = Router() 

//middle ware
const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware')//controller 
const  digitalController = require('../../../../controllers/digitalassestController')


router.get('/' ,authenicationToken , onlyAdiminMiddleWare , digitalController.getAllDigitalAssets ) ;
router.get('/total' ,authenicationToken , onlyAdiminMiddleWare , digitalController.getDigitalAssetsTotal) ;
router.get('/:id', authenicationToken , onlyAdiminMiddleWare , digitalController.getDigitalAssetsById) ;
router.post('/',authenicationToken , onlyAdiminMiddleWare , digitalController.createDigitalAssets) ;
router.put('/:id' , authenicationToken , onlyAdiminMiddleWare , digitalController.updateDigitalAssets) ;
router.delete('/:id', authenicationToken , onlyAdiminMiddleWare  , digitalController.deleteDigitalAssets)


module.exports = router 