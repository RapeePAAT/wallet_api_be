const {Router} = require('express')



const router = Router()

//midle ware 
const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware')
// controller

const  {getAllCryptocurrency,getCryptocurrencyById, creatCryptocurrency , upateCryptocurrency  , deleteCryptocurrency} = require('../../../../controllers/cryptocurrencyController')

router.get('/',getAllCryptocurrency) ;  
router.get('/:id',getCryptocurrencyById) ;  
router.post('/',authenicationToken ,onlyAdiminMiddleWare,creatCryptocurrency) ;  
router.put('/:id',authenicationToken,onlyAdiminMiddleWare,upateCryptocurrency) ;  
router.delete('/:id',authenicationToken,onlyAdiminMiddleWare,deleteCryptocurrency) ;  

module.exports = router