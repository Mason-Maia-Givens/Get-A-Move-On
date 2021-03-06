const router = require('express').Router();
const userRoutes = require('./userRoutes');
const moveRoutes = require('./moveRoutes');

router.use('/users', userRoutes);
router.use('/moves', moveRoutes);

module.exports = router;