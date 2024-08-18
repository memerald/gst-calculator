const dotenv = require('dotenv');
dotenv.config();

const configs = {
	config: {
		local: {
			mongoUrl: process.env.MONGODB_URL,
		},
	},
};

module.exports = configs;
