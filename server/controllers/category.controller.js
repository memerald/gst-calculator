const Category = require('../models/category.model');

const categoryController = {
	createCategory: async (req, res) => {
		try {
			const { name, gstRate } = req.body;
			const category = new Category({ name, gstRate });
			await category.save();
			return res.status(200).json({ message: 'Category saved successfully.' });
		} catch (error) {
			return res.status(500).json({ message: 'Error saving category', error });
		}
	},
	getCategories: async (req, res) => {
		try {
			const categories = await Category.find();
			return res.status(200).json({ data: categories });
		} catch (error) {
			return res.status(500).json({ message: 'Error retrieving categories', error });
		}
	},
};

module.exports = categoryController;
