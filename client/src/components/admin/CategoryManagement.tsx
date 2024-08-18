import { FormEvent, useState } from 'react';
import api from '../../api/axios';

const CategoryManagement = () => {
	const [name, setName] = useState('');
	const [gstRate, setGstRate] = useState('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await api.post('/category', { name, gstRate });
			alert('Category added successfully');
			setName('');
			setGstRate('');
		} catch (error) {
			console.error(error);
			alert('Error adding category');
		}
	};

	return (
		<div className="card w-full max-w-sm mx-auto bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">Add Category</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label className="label">Category Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control mt-4">
						<label className="label">GST Rate (%)</label>
						<input
							type="number"
							value={gstRate}
							onChange={(e) => setGstRate(e.target.value)}
							className="input input-bordered"
							required
						/>
					</div>
					<div className="form-control mt-6">
						<button type="submit" className="btn btn-primary">
							Add Category
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CategoryManagement;
