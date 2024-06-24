const { Router } = require('express')

const router = Router()

//middle ware
const { authenicationToken, onlyAdiminMiddleWare } = require('../middlewares/authMiddleware')
const digitalController = require('../controllers/digitalassestController')



/**
 * @swagger
 * tags:
 *   name: DigitalAssets
 *   description: APIs related to managing digital assets
 */

/**
 * @swagger
 * /api/v1/digitalassets:
 *   get:
 *     summary: Get all digital assets (admin only)
 *     tags: [DigitalAssets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of digital assets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 *       404:
 *         description: No digital assets found
 *       500:
 *         description: Internal server error
 */
router.get('/', authenicationToken, onlyAdiminMiddleWare, digitalController.getAllDigitalAssets);

/**
 * @swagger
 * /api/v1/digitalassets/total:
 *   get:
 *     summary: Get total balance of all digital assets (admin only)
 *     tags: [DigitalAssets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total balance of digital assets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBalance:
 *                   type: number
 *       400:
 *         description: No data available
 *       500:
 *         description: Internal server error
 */
router.get('/total', authenicationToken, onlyAdiminMiddleWare, digitalController.getDigitalAssetsTotal);

/**
 * @swagger
 * /api/v1/digitalassets/{id}:
 *   get:
 *     summary: Get a digital asset by ID (admin only)
 *     tags: [DigitalAssets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the digital asset to fetch
 *     responses:
 *       200:
 *         description: A digital asset object
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *             
 *       404:
 *         description: Digital asset not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenicationToken, onlyAdiminMiddleWare, digitalController.getDigitalAssetsById);

/**
 * @swagger
 * /api/v1/digitalassets:
 *   post:
 *     summary: Create a new digital asset (admin only)
 *     tags: [DigitalAssets]
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
 *               balance:
 *                 type: number
 *             example:
 *               cryptocurrency_id: 1
 *               balance: 100
 *     responses:
 *       201:
 *         description: Digital asset created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Cryptocurrency not found
 *       500:
 *         description: Internal server error
 */
router.post('/', authenicationToken, onlyAdiminMiddleWare, digitalController.createDigitalAssets);

/**
 * @swagger
 * /api/v1/digitalassets/{id}:
 *   put:
 *     summary: Update a digital asset by ID (admin only)
 *     tags: [DigitalAssets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the digital asset to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: number
 *             example:
 *               balance: 150
 *     responses:
 *       200:
 *         description: Digital asset updated successfully
 *       400:
 *         description: Can't update digital asset
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenicationToken, onlyAdiminMiddleWare, digitalController.updateDigitalAssets);

/**
 * @swagger
 * /api/v1/digitalassets/{id}:
 *   delete:
 *     summary: Delete a digital asset by ID (admin only)
 *     tags: [DigitalAssets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the digital asset to delete
 *     responses:
 *       200:
 *         description: Digital asset deleted successfully
 *       404:
 *         description: Digital asset not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenicationToken, onlyAdiminMiddleWare, digitalController.deleteDigitalAssets);

module.exports = router 