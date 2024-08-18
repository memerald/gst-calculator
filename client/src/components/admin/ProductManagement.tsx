import { useState, useEffect, FormEvent } from 'react';
import { ICategoryResponse } from '../../types/types';
import api from '../../api/axios';

const ProductManagement = () => {
	const [name, setName] = useState<string>('');
	const [price, setPrice] = useState<string>('');
	const [categoryId, setCategoryId] = useState<string>('');
	const [categories, setCategories] = useState<ICategoryResponse[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await api.get('/categories');
			setCategories(response.data.data);
		};
		fetchCategories();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await api.post('/products', { name, price, categoryId });
			alert('Product added successfully');
			setName('');
			setPrice('');
			setCategoryId('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="card w-full max-w-sm mx-auto bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">Add Product</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label className="label">Product Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control mt-4">
						<label className="label">Price</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control mt-4">
						<label className="label">Category</label>
						<select
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
							className="select select-bordered"
							required>
							<option disabled selected value="">
								Select Category
							</option>
							{categories?.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-control mt-6">
						<button type="submit" className="btn btn-primary">
							Add Product
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductManagement;
