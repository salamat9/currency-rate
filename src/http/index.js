import axios from 'axios';

const BASE_URL = 'https://www.cbr-xml-daily.ru';

const api = axios.create({
	baseURL: BASE_URL,
});

export default api;
