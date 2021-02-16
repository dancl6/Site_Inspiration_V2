const router = require('express').Router();
const userRoutes = require('./user-routes');
const quoteRoutes = require('./quote-routes');
const reasonRoutes = require('./reason-routes');
// const profitRoutes = require('./product_profit-routes');

router.use('/users', userRoutes);
router.use('/quotes', quoteRoutes);
router.use('/reason', reasonRoutes);
// router.use('/profits', profitRoutes);

module.exports = router