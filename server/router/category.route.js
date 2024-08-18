const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

router.post('/category', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);

module.exports = router;
