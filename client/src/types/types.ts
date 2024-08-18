export interface IProductResponse {
	_id: string;
	name: string;
	price: number;
	category: {
		_id: string;
		name: string;
		gstRate: number;
		__v: number;
	};
	__v: number;
}

export interface ISales {
	product: {
		_id: string;
		name: string;
		price: number;
	};
	category: string;
	tax: number;
	rate: number;
}

export interface ICategoryResponse {
	_id: string;
	name: string;
	gstRate: number;
	__v: number;
}

export interface IAdminSalesResponse {
	_id: string;
	products: {
		product: string;
		name: string;
		category: string;
		quantity: number;
		_id: string;
	}[];
	totalAmount: number;
	totalTax: number;
	date: string;
	__v: number;
}
