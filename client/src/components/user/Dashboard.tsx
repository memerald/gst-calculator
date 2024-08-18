import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecordSales from './RecordSales';

const UserDashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const role = localStorage.getItem('role');
		if (!role) {
			navigate('/');
		}
	}, [navigate]);

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
			<RecordSales />
		</div>
	);
};

export default UserDashboard;
