import { Link } from 'react-router-dom';

const Home = () => {
	const setUserRole = (role: 'admin' | 'user') => {
		localStorage.setItem('role', role);
	};

	return (
		<div className="flex justify-center items-center gap-4 h-full">
			<button
				onClick={() => setUserRole('user')}
				className="btn btn-primary text-gray-200 text-2xl">
				<Link to="/dashboard">User</Link>
			</button>
			<button
				onClick={() => setUserRole('admin')}
				className="btn btn-primary text-gray-200 text-2xl">
				<Link to="/admin">Admin</Link>
			</button>
		</div>
	);
};

export default Home;
