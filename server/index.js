const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const configs = require('./config/config');
const saleRouter = require('./router/sale.route');
const productRouter = require('./router/product.route');
const categoryRouter = require('./router/category.route');

dotenv.config();
const app = express();

mongoose
	.connect(configs.config.local.mongoUrl)
	.then((err) => {
		console.log('DB Connected');
	})
	.catch((error) => console.log({ error }));

app.use(
	cors({
		credentials: false,
		origin: ['http://localhost:5173'],
	}),
);

app.use(express.json());
app.use('/api', saleRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.listen(3000, () => {
	console.log(`The app is running on 3000`);
});
