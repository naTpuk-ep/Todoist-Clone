import axiosLib from 'axios';
import { getContents, setContents } from './localStorage';

const baseURL = process.env.REACT_APP_BASE_URL;

const axios = axiosLib.create({
  validateStatus: function (status) {
    return status >= 200 && status < 600;
  },
})

export const auth = {

	token: getContents('token'),

	setToken (value) {
		auth.token = value;
		setContents('token', value);
	},

	getAuthHeaders () {
    return auth.token
      ? { Authorization: auth.token }
      : {};
  },

	async login (data) {
		const response = await axios({
			baseURL,
			method: 'post',
			url: '/auth/login',
			data,
		});

		auth.setToken(response.data.token);

		return response.data;
	},

	async register (data) {
		const response = await axios({
			baseURL,
			method: 'post',
			url: '/auth/register',
			data,
		});
		
		auth.setToken(response.data.token);

		return response.data;
	},

	async test () {
		const headers = auth.getAuthHeaders();
		const response = await axios({
			baseURL,
			method: 'post',
			url: '/auth/test',
			headers,
		});
		return response.data;
	},
};

export const todosDB = {

	async get () {
		const headers = auth.getAuthHeaders();
		const response = await axios({
			baseURL,
			url: '/todoist',
			headers,
		});
		return response.data.statusCode ? undefined : response.data;
	},

	async create (data) {
		const headers = auth.getAuthHeaders();

		const response = await axios({
			baseURL,
			method: 'post',
			data,
			url: '/todoist',
			headers,
		});

		return response.data;
	},

	async save (data) {
		const headers = auth.getAuthHeaders();
		
		const response = await axios({
			baseURL,
			method: 'put',
			data,
			url: `/todoist/${data.id}`,
			headers,
		});

		return response.data;
	},

	async remove (data) {
		const headers = auth.getAuthHeaders();

		const response = await axios({
			baseURL,
			method: 'delete',
			url: `/todoist/${data.id}`,
			headers,
		});

		return response.data;
	},
};