import $api from '../http/index.js';
import { formatPrice } from '../assets/utils/format.js'

export default {
	async getAllCurrencies() {
		const response = await $api.get('/daily_json.js');
		const currencies = response.data.Valute;
		const result = {};

		for (let code in currencies) {
			const value = currencies[code].Value;
			const previous = currencies[code].Previous;
			const nominal = currencies[code].Nominal;
			result[code] = {
				...currencies[code],
				base: 'RUB',
				quote: code,
				baseValue: formatPrice(nominal / value),
				basePrevious: formatPrice(nominal / previous),
				quoteValue: formatPrice(value / nominal),
				quotePrevious: formatPrice(previous / nominal),
				coefficient: 1 / (value / nominal),
			};
		}

		return result;
	},
};
