const {Router} = require('express')
const router = Router() 

const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware')//controller 

const  exchange = require('../../../../controllers/exchangeController')
router.get('/' ,authenicationToken  , exchange.getAllExchangeRate) ;
router.get('/:id' ,authenicationToken  , exchange.getExchangeRateById) ;
router.post('/' , authenicationToken , onlyAdiminMiddleWare , exchange.createExchangeRate) ;
router.put('/:id' , authenicationToken , onlyAdiminMiddleWare , exchange.updateExchangeRateById) ;
router.delete('/:id' ,authenicationToken , onlyAdiminMiddleWare , exchange.deleteExchangeRateById)


module.exports = router ;