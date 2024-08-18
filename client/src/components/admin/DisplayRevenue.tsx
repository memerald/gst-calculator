import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import api from '../../api/axios';
import { IAdminSalesResponse } from '../../types/types';

const DisplayRevenue = () => {
	const [sales, setSales] = useState<IAdminSalesResponse[]>([]);
	const [revenue, setRevenue] = useState({
		dayRevenue: 0,
		monthRevenue: 0,
		yearRevenue: 0,
	});

	const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

	useEffect(() => {
		// Fetch sales for the selected day
		const fetchSales = async () => {
			try {
				const response = await api.get(`/sales/${selectedDate}`);
				setSales(response.data.data);
			} catch (error) {
				console.error('Error fetching sales', error);
			}
		};

		// Fetch revenue data
		const fetchRevenue = async () => {
			try {
				const response = await api.get('/total-revenue', {
					params: { date: selectedDate },
				});
				setRevenue(response.data.data);
			} catch (error) {
				console.error('Error fetching revenue', error);
			}
		};

		fetchSales();
		fetchRevenue();
	}, [selectedDate]);

	return (
		<div className="p-4">
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold mb-4">Revenue</h2>
				<Link to="/admin">
					<button className="btn btn-primary">Back</button>
				</Link>
			</div>

			<div className="mb-4">
				<label htmlFor="date" className="text-sm font-medium">
					Select Date:
				</label>
				<input
					type="date"
					id="date"
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				<div className="stat">
					<div className="stat-title">Revenue for Day</div>
					<div className="stat-value text-primary">{revenue?.dayRevenue.toFixed(2)}</div>
				</div>
				<div className="stat">
					<div className="stat-title">Revenue for Month</div>
					<div className="stat-value text-secondary">{revenue?.monthRevenue.toFixed(2)}</div>
				</div>
				<div className="stat">
					<div className="stat-title">Revenue for Year</div>
					<div className="stat-value text-accent">{revenue?.yearRevenue.toFixed(2)}</div>
				</div>
			</div>

			<h3 className="text-xl font-bold mb-4">Sales for {selectedDate}</h3>
			{sales?.length > 0 ? (
				<table className="table w-full">
					<thead>
						<tr>
							<th>Product</th>
							<th>Category</th>
							<th>Quantity</th>
							<th>Tax</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{sales?.map((sale, index) => {
							return sale?.products.map((prod) => {
								return (
									<tr key={index}>
										<td>{prod.name}</td>
										<td>{prod.category}</td>
										<td>{prod.quantity}</td>
										<td>{sale.totalTax}</td>
										<td>{sale.totalAmount}</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
			) : (
				<p>No sales found for this date.</p>
			)}
		</div>
	);
};

export default DisplayRevenue;
