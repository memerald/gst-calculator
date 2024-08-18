import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem('role') !== null;

	const logout = () => {
		localStorage.removeItem('role');
		navigate('/');
	};

	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between">
				<Link to="/" className="text-white font-bold text-xl">
					GST Management
				</Link>
				<div>
					<Link to="/dashboard" className="text-white mx-2">
						User Dashboard
					</Link>
					<Link to="/admin" className="text-white mx-2">
						Admin Dashboard
					</Link>
					{isLoggedIn && (
						<Link onClick={logout} to="/admin" className="text-white mx-2">
							Logout
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
