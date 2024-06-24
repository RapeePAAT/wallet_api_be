
//user.js
const {Router}  =require('express')
const router=  Router();
const {getAllUser , getOneUser  , updateUser , deleteUser} = require('../controllers/userController')
const {authenicationToken , onlyAdiminMiddleWare} = require('../middlewares/authMiddleware')



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */



/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *              
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/' ,authenicationToken , onlyAdiminMiddleWare , getAllUser)


/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Retrieve a single user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

router.get('/:id',authenicationToken,  getOneUser)


/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id',authenicationToken,  updateUser)


/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id',authenicationToken,onlyAdiminMiddleWare, deleteUser )


module.exports = router;