const Product = require('../models/product.model');

const productController = {
	createProduct: async (req, res) => {
		try {
			const { name, price, categoryId } = req.body;
			const product = new Product({ name, price, category: categoryId });
			await product.save();
			return res.status(201).json({ message: 'Product saved successfully' });
		} catch (error) {
			return res.status(500).json({ message: 'Error saving product', error });
		}
	},
	getProduct: async (req, res) => {
		try {
			const products = await Product.find().populate('category');
			return res.status(200).json({ data: products });
		} catch (error) {
			return res.status(500).json({ message: 'Error retrieving products', error });
		}
	},
};

module.exports = productController;
