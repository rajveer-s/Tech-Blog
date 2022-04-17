const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const dashboard = require('./dashboard');



router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboard);


module.exports = router;
