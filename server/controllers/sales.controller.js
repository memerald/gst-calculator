const Sale = require('../models/sale.model');

const salesController = {
	createSales: async (req, res) => {
		try {
			const { products, totalTax, grandTotal, quantity } = req.body;

			const totalProducts = products.map((product) => {

				return {
					product: product.product._id,
					name: product.product.name,
					category: product.category,
					quantity,
				};
			});

			const sale = new Sale({ products: totalProducts, totalAmount: grandTotal, totalTax });
			await sale.save();
			return res.status(201).json({ message: 'Sale saved successfully' });
		} catch (error) {
			return res.status(500).json({ message: 'Error saving sale', error });
		}
	},
	retrieveDateSales: async (req, res) => {
		try {
			const { date } = req.params;
			const startOfDay = new Date(date).setUTCHours(0, 0, 0, 0);
			const endOfDay = new Date(date).setUTCHours(23, 59, 59, 999);

			const sales = await Sale.find({
				date: {
					$gte: new Date(startOfDay).toISOString(),
					$lte: new Date(endOfDay).toISOString(),
				},
			});

			return res.status(200).json({ data: sales });
		} catch (error) {
			return res.status(500).json({ message: 'Error fetching sales', error });
		}
	},
	totalRevenue: async (req, res) => {
		try {
			const { date } = req.query;

			const startOfDay = new Date(date).setUTCHours(0, 0, 0, 0);
			const endOfDay = new Date(date).setUTCHours(23, 59, 59, 999);
			const startOfMonth = new Date(date).setUTCDate(1);
			const startOfYear = new Date(date).setUTCMonth(0, 1);

			const dayRevenue = await Sale.aggregate([
				{ $match: { createdAt: { $gte: new Date(startOfDay), $lte: new Date(endOfDay) } } },
				{ $group: { _id: null, total: { $sum: '$grandTotal' } } },
			]);

			const monthRevenue = await Sale.aggregate([
				{ $match: { createdAt: { $gte: new Date(startOfMonth), $lte: new Date(endOfDay) } } },
				{ $group: { _id: null, total: { $sum: '$grandTotal' } } },
			]);

			const yearRevenue = await Sale.aggregate([
				{ $match: { createdAt: { $gte: new Date(startOfYear), $lte: new Date(endOfDay) } } },
				{ $group: { _id: null, total: { $sum: '$grandTotal' } } },
			]);

			return res.status(200).json({
				data: {
					dayRevenue: dayRevenue[0]?.total || 0,
					monthRevenue: monthRevenue[0]?.total || 0,
					yearRevenue: yearRevenue[0]?.total || 0,
				},
			});
		} catch (error) {
			return res.status(500).json({ message: 'Error fetching revenue', error });
		}
	},
};

module.exports = salesController;
