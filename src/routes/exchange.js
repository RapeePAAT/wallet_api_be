const {Router} = require('express')
const router = Router() 

const {authenicationToken , onlyAdiminMiddleWare} = require('../middlewares/authMiddleware')

const  exchange = require('../controllers/exchangeController')


/**
 * @swagger
 * tags:
 *   name: ExchangeRates
 *   description: APIs related to managing exchange rates
 */

/**
 * @swagger
 * /api/v1/exchange:
 *   get:
 *     summary: Get all exchange rates (admin only)
 *     tags: [ExchangeRates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       404:
 *         description: No exchange rates found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenicationToken, exchange.getAllExchangeRate);

/**
 * @swagger
 * /api/v1/exchange/{id}:
 *   get:
 *     summary: Get an exchange rate by ID
 *     tags: [ExchangeRates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the exchange rate to fetch
 *     responses:
 *       200:
 *         description: An exchange rate object
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Exchange rate not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenicationToken, exchange.getExchangeRateById);

/**
 * @swagger
 * /api/v1/exchange:
 *   post:
 *     summary: Create a new exchange rate (admin only)
 *     tags: [ExchangeRates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from_cryptocurrency_id:
 *                 type: integer
 *               to_cryptocurrency_id:
 *                 type: integer
 *               rate:
 *                 type: number
 *             example:
 *               from_cryptocurrency_id: 1
 *               to_cryptocurrency_id: 2
 *               rate: 0.5
 *     responses:
 *       201:
 *         description: Exchange rate created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', authenicationToken, onlyAdiminMiddleWare, exchange.createExchangeRate);

/**
 * @swagger
 * /api/v1/exchange/{id}:
 *   put:
 *     summary: Update an exchange rate by ID (admin only)
 *     tags: [ExchangeRates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the exchange rate to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: number
 *             example:
 *               rate: 0.75
 *     responses:
 *       200:
 *         description: Exchange rate updated successfully
 *       400:
 *         description: Can't update exchange rate
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenicationToken, onlyAdiminMiddleWare, exchange.updateExchangeRateById);

/**
 * @swagger
 * /api/v1/exchange/{id}:
 *   delete:
 *     summary: Delete an exchange rate by ID (admin only)
 *     tags: [ExchangeRates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the exchange rate to delete
 *     responses:
 *       200:
 *         description: Exchange rate deleted successfully
 *       404:
 *         description: Exchange rate not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenicationToken, onlyAdiminMiddleWare, exchange.deleteExchangeRateById);

module.exports = router;


