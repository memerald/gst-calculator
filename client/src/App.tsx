import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/admin/Dashboard';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/user/Dashboard';
import Home from './components/pages/Home';
import DisplayRevenue from './components/admin/DisplayRevenue';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mx-auto p-4 h-[calc(100vh_-_60px)]">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/admin" element={<AdminDashboard />} />
					<Route path="/dashboard" element={<UserDashboard />} />
					<Route path="/revenue" element={<DisplayRevenue />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
