const {Router } = require('express')
const router = Router();

router.use('/api/v1' , require('./api/v1/endpoint/index'))

module.exports = router; 