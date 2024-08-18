const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	products: [
		{
			product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
			name: { type: String, required: true },
			category: { type: String, required: true },
			quantity: { type: Number, required: true },
		},
	],
	date: { type: Date, default: Date.now },
	totalAmount: { type: Number, required: true },
	totalTax: { type: Number, required: true },
});

module.exports = mongoose.model('Sale', saleSchema);
