import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000/api',
	responseType: 'json',
	withCredentials: false,
});

export default api;
