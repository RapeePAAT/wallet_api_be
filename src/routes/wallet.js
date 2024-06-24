const { Router } = require('express')

const router = Router()

// Middleware 
const { authenicationToken, onlyAdiminMiddleWare } = require('../middlewares/authMiddleware')
// Controller
const { getAllWallet, getAllWalletByUser, getWalletById, getAllWalletByUserId, createWallet, updateWalletByid, deleteWallete } = require('../controllers/walletController')

/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: APIs related to managing wallets
 */

/**
 * @swagger
 * /api/v1/wallet:
 *   get:
 *     summary: Get all wallets (admin only)
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             
 *       404:
 *         description: No wallets found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenicationToken, onlyAdiminMiddleWare, getAllWallet);

/**
 * @swagger
 * /api/v1/wallet/user:
 *   get:
 *     summary: Get all wallets for the authenticated user
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wallets for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               
 *       404:
 *         description: No wallets found
 *       500:
 *         description: Internal server error
 */
router.get('/user', authenicationToken, getAllWalletByUser);

/**
 * @swagger
 * /api/v1/wallet/user/{id}:
 *   get:
 *     summary: Get all wallets for a specific user by ID (admin only)
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of wallets for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 *       404:
 *         description: No wallets found
 *       500:
 *         description: Internal server error
 */
router.get('/user/:id', authenicationToken, onlyAdiminMiddleWare, getAllWalletByUserId);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   get:
 *     summary: Get a wallet by ID (admin only)
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the wallet to fetch
 *     responses:
 *       200:
 *         description: A wallet object
 *         content:
 *           application/json:
 *               schema:
 *            
 *       404:
 *         description: Wallet not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenicationToken, onlyAdiminMiddleWare, getWalletById);

/**
 * @swagger
 * /api/v1/wallet:
 *   post:
 *     summary: Create a new wallet
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptocurrency_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *             example:
 *               cryptocurrency_id: 1
 *               amount: 100
 *     responses:
 *       201:
 *         description: Wallet created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Cryptocurrency or Digital Asset not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenicationToken, createWallet);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   put:
 *     summary: Update a wallet by ID
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the wallet to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cryptocurrency_id:
 *                 type: integer
 *               amount:
 *                 type: number
 *             example:
 *               cryptocurrency_id: 1
 *               amount: 100
 *     responses:
 *       200:
 *         description: Wallet updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Wallet or Digital Asset not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenicationToken, updateWalletByid);

/**
 * @swagger
 * /api/v1/wallet/{id}:
 *   delete:
 *     summary: Delete a wallet by ID
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the wallet to delete
 *     responses:
 *       200:
 *         description: Wallet deleted successfully
 *       404:
 *         description: Wallet not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenicationToken, deleteWallete);

module.exports = router;
