const router = require('express').Router();
const salesController = require('../controllers/sales.controller');

router.post('/sales', salesController.createSales);

router.get('/sales/:date', salesController.retrieveDateSales);
router.get('/total-revenue', salesController.totalRevenue);

module.exports = router;
