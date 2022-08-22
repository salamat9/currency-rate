<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { formatPrice } from '../assets/utils/format.js';
import CurrencyService from '../services/CurrencyService.js';

const search = ref(null);
const currencies = ref(null);

const filteredCurrencies = computed(() => {
	if (!search.value) return currencies.value;
	return Object.values(currencies.value).filter(obj => {
		const name = obj.Name.toLowerCase();
		const code = obj.CharCode.toLowerCase();
		const searchValue = search.value.trim();
		return name.includes(searchValue) || code.includes(searchValue);
	});
});

onBeforeMount(async () => {
	currencies.value = await CurrencyService.getAllCurrencies();
});

const toggleBaseCurrency = _currency => {
	const currency = currencies.value[_currency.CharCode];
	currencies.value[_currency.CharCode] = { ...currency, flag: !currency.flag };
};

const indication = (previous, value) => {
	if (previous > value) return true;
	else return false;
};
</script>

<template>
	<div>
		<input
			class="form-control"
			placeholder="Search..."
			@input="e => (search = e.target.value.toLowerCase())"
			type="text"
		/>
	</div>

	<table class="table">
		<thead>
			<tr>
				<th scope="col">pair</th>
				<th scope="col">price</th>
				<th scope="col">rate</th>
				<th scope="col">change</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="currency in filteredCurrencies" :key="currency.ID">
				<template v-if="currency.flag">
					<td>{{ currency.quote }} / {{ currency.base }}</td>
					<td>{{ formatPrice(currency.quoteValue) }} {{ currency.base }}</td>
					<td>
						<img
							v-if="indication(currency.quotePrevious, currency.quoteValue)"
							src="../assets/icons/down.png"
							alt="down"
						/>
						<img v-else src="../assets/icons/up.png" alt="up" />
					</td>
					<td>
						<button
							@click="toggleBaseCurrency(currency)"
							class="btn btn-primary"
						>
							Toggle
						</button>
					</td>
				</template>
				<template v-else>
					<td>{{ currency.base }} / {{ currency.quote }}</td>
					<td>{{ currency.baseValue }} {{ currency.quote }}</td>
					<td>
						<img
							v-if="indication(currency.basePrevious, currency.baseValue)"
							src="../assets/icons/down.png"
							alt="down"
						/>
						<img v-else src="../assets/icons/up.png" alt="up" />
					</td>
					<td>
						<button
							@click="toggleBaseCurrency(currency)"
							class="btn btn-primary"
						>
							Toggle
						</button>
					</td>
				</template>
			</tr>
		</tbody>
	</table>
</template>
