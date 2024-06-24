const {Router} = require("express")
const router = Router()
const {authenicationToken , onlyAdiminMiddleWare} = require('../middlewares/authMiddleware')
const  transaction = require('../controllers/transactionController')

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: APIs related to managing transactions
 */

/**
 * @swagger
 * /api/v1/transaction:
 *   get:
 *     summary: Get all transactions (admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenicationToken, onlyAdiminMiddleWare, transaction.getAllTransaction);

/**
 * @swagger
 * /api/v1/transaction/user:
 *   get:
 *     summary: Get transactions of the authenticated user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Internal server error
 */
router.get('/user', authenicationToken, transaction.getTransactionByUser);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *   get:
 *     summary: Get a transaction by ID (admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the transaction to fetch
 *     responses:
 *       200:
 *         description: A transaction object
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenicationToken, onlyAdiminMiddleWare, transaction.getTransactionById);

/**
 * @swagger
 * /api/v1/transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to_user_id:
 *                 type: integer
 *               from_cryptocurrency_id:
 *                 type: integer
 *               to_cryptocurrency_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *             example:
 *               to_user_id: 2
 *               from_cryptocurrency_id: 1
 *               to_cryptocurrency_id: 2
 *               amount: 100
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', authenicationToken, transaction.createTransaction);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *   delete:
 *     summary: Delete a transaction by ID (admin only)
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the transaction to delete
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenicationToken, onlyAdiminMiddleWare, transaction.deleteTransaction);

module.exports = router;

