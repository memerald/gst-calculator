import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';

const AdminDashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const userType = localStorage.getItem('role');

		if (userType !== 'admin') navigate('/');
	}, [navigate]);

	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
				<div>
					<Link to="/revenue">
						<button className="btn btn-primary">Check Revenue</button>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<CategoryManagement />
				</div>
				<div>
					<ProductManagement />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
