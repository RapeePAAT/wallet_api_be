const { Router } = require('express')

const router = Router()

// Middleware
const { authenicationToken, onlyAdiminMiddleWare } = require('../middlewares/authMiddleware')

// Controller
const { getAllCryptocurrency, getCryptocurrencyById, creatCryptocurrency, upateCryptocurrency, deleteCryptocurrency } = require('../controllers/cryptocurrencyController')

/**
 * @swagger
 * tags:
 *   name: Cryptocurrencies
 *   description: APIs related to managing cryptocurrencies
 */

/**
 * @swagger
 * /api/v1/cryptocurrency:
 *   get:
 *     summary: Get all cryptocurrencies
 *     tags: [Cryptocurrencies]
 *     responses:
 *       200:
 *         description: List of cryptocurrencies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       404:
 *         description: No cryptocurrencies found
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCryptocurrency);

/**
 * @swagger
 * /api/v1/cryptocurrency/{id}:
 *   get:
 *     summary: Get a cryptocurrency by ID
 *     tags: [Cryptocurrencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the cryptocurrency to fetch
 *     responses:
 *       200:
 *         description: A cryptocurrency object
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getCryptocurrencyById);

/**
 * @swagger
 * /api/v1/cryptocurrency:
 *   post:
 *     summary: Create a new cryptocurrency
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               symbol:
 *                 type: string
 *             example:
 *               name: Ethereum
 *               symbol: ETH
 *     responses:
 *       200:
 *         description: Cryptocurrency created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', authenicationToken, onlyAdiminMiddleWare, creatCryptocurrency);

/**
 * @swagger
 * /api/v1/cryptocurrency/{id}:
 *   put:
 *     summary: Update a cryptocurrency by ID
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the cryptocurrency to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               symbol:
 *                 type: string
 *             example:
 *               name: Ethereum
 *               symbol: ETH
 *     responses:
 *       200:
 *         description: Cryptocurrency updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenicationToken, onlyAdiminMiddleWare, upateCryptocurrency);

/**
 * @swagger
 * /api/v1/cryptocurrency/{id}:
 *   delete:
 *     summary: Delete a cryptocurrency by ID
 *     tags: [Cryptocurrencies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the cryptocurrency to delete
 *     responses:
 *       200:
 *         description: Cryptocurrency deleted successfully
 *       404:
 *         description: Cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenicationToken, onlyAdiminMiddleWare, deleteCryptocurrency);

module.exports = router;
