const {Router} = require("express")
const router = Router()
const {authenicationToken , onlyAdiminMiddleWare} = require('../../../../middlewares/authMiddleware')//controller 
const  transaction = require('../../../../controllers/transactionController')
/*
//see all transaction 
//see transaction by id
//see transaction by only User
// create transaction by user
//delete transaciion by admin
*/

router.get('/' ,authenicationToken, onlyAdiminMiddleWare ,transaction.getAllTransaction )
router.get('/user' ,authenicationToken ,transaction.getTransactionByUser )
router.get('/:id' ,authenicationToken , onlyAdiminMiddleWare , transaction.getTransactionById)
router.post('/' , authenicationToken , transaction.createTransaction)
router.delete('/:id' ,authenicationToken , onlyAdiminMiddleWare , transaction.deleteTransaction) ;


module.exports = router ;