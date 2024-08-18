import { useState, useEffect, ChangeEvent } from 'react';
import api from '../../api/axios';
import { IProductResponse, ISales } from '../../types/types';

const RecordSales = () => {
	const [products, setProducts] = useState<IProductResponse[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<IProductResponse | any>({});

	const [sales, setSales] = useState<ISales[]>([]);

	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [totalTax, setTotalTax] = useState<number>(0);

	useEffect(() => {
		// Fetch products from the backend
		const fetchProducts = async () => {
			try {
				const response = await api.get('/products');
				setProducts(response.data.data);
			} catch (error) {
				console.error('Error fetching products', error);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		// Calculate the total amount and total tax whenever the sales list changes
		const total = sales.reduce(
			(acc, item) => {
				acc.amount += item.rate;
				acc.tax += item.tax;
				return acc;
			},
			{ amount: 0, tax: 0 },
		);
		setTotalAmount(total.amount);
		setTotalTax(total.tax);
	}, [sales]);

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const product = products.find((p) => p._id === e.target.value);
		setSelectedProduct(product!);
	};

	const addProduct = () => {
		if (selectedProduct) {
			const saleItem = {
				product: selectedProduct,
				category: selectedProduct.category.name,
				rate: selectedProduct.price,
				tax: (selectedProduct.price * selectedProduct.category.gstRate) / 100,
			};
			setSales((prev) => [...prev, saleItem]);
			setSelectedProduct({});
		}
	};

	const saveSale = async () => {
		const bill = {
			products: sales,
			totalAmount,
			totalTax,
			grandTotal: totalAmount + totalTax,
			category: selectedProduct.category,
			quantity: sales.length,
		};

		try {
			await api.post('/sales', bill);
			alert('Sale saved successfully!');
			// Reset states
			setSales([]);
			setTotalAmount(0);
			setTotalTax(0);
		} catch (error) {
			console.error('Error saving sale', error);
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Record a Sale</h2>
			<div className="flex items-center mb-4">
				<select
					value={selectedProduct ? selectedProduct._id : ''}
					onChange={handleChange}
					className="select select-bordered w-full max-w-xs mr-4">
					<option disabled selected value="">
						Select a Product
					</option>
					{products?.map((product) => (
						<option key={product._id} value={product._id}>
							{product.name}
						</option>
					))}
				</select>
				<button onClick={addProduct} className="btn btn-primary" disabled={!selectedProduct._id}>
					Add Product
				</button>
			</div>

			{sales.length > 0 && (
				<>
					<div className="max-h-96 overflow-y-auto">
						<table className="table table-pin-rows table-zebra w-full">
							<thead>
								<tr>
									<th>Product</th>
									<th>Category</th>
									<th>Rate</th>
									<th>Tax</th>
								</tr>
							</thead>
							<tbody>
								{sales.map((sale, index) => (
									<tr key={index} className="hover">
										<td>{sale.product.name}</td>
										<td>{sale.category}</td>
										<td>{sale.rate}</td>
										<td>{sale.tax.toFixed(2)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex justify-between mt-8">
						<div className="bg-gray-700 p-4 rounded-md w-1/4">
							<h3 className="text-xl font-bold mb-2">Final Bill</h3>
							<div className="flex justify-between mb-2">
								<span className="font-semibold">Total Amount:</span>
								<span>{totalAmount.toFixed(2)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span className="font-semibold">Total Tax:</span>
								<span>{totalTax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Grand Total:</span>
								<span>{(totalAmount + totalTax).toFixed(2)}</span>
							</div>
						</div>
						<button onClick={saveSale} className="btn btn-success mt-4 self-end">
							Save Sale
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default RecordSales;
