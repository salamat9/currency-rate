<script setup>
import { ref, onMounted, computed } from 'vue';
import { formatPrice } from '../assets/utils/format.js';
import CurrencyService from '../services/CurrencyService.js';

const currencies = ref(null);
const firstCurrency = ref(null);
const secondCurrency = ref(null);
const amount = ref(null);
const result = ref(null);

onMounted(async () => {
	currencies.value = await CurrencyService.getAllCurrencies();
});

const convert = () => {
	if (firstCurrency.value && secondCurrency.value && amount.value) {
		const xName = firstCurrency.value.Name;
		const yName = secondCurrency.value.Name;
		const xValue = firstCurrency.value.quoteValue;
		const yValue = secondCurrency.value.quoteValue;

		const sum = formatPrice((xValue / yValue) * amount.value);

		result.value = `${amount.value} ${xName} = ${sum} ${yName}`;
	}
};

const change = () => {
	if (firstCurrency.value && secondCurrency.value && amount.value) {
		const xName = firstCurrency.value.Name;
		const yName = secondCurrency.value.Name;
		const xValue = firstCurrency.value.quoteValue;
		const yValue = secondCurrency.value.quoteValue;

		firstCurrency.value.Name = yName;
		secondCurrency.value.Name = xName;
		firstCurrency.value.quoteValue = yValue;
		secondCurrency.value.quoteValue = xValue;

		const sum = formatPrice((yValue / xValue) * amount.value);

		result.value = `${amount.value} ${yName} = ${sum} ${xName}`;
	}
};

const currencyName = computed(() => {
	console.log(firstCurrency.value);
	if (firstCurrency.value) return firstCurrency.value.Name;
});
</script>

<template>
	<div class="row g3 justify-content-center m-3">
		<div class="col-auto">
			<label class="form-label">Amount</label>
			<input
				class="form-control"
				type="number"
				v-model.number="amount"
				@input="convert"
			/>
		</div>

		<div class="col-auto">
			<label class="form-label">From</label>
			<select
				class="form-select form-select mb-3"
				aria-label=".form-select-lg example"
				v-model.number="firstCurrency"
				@change="convert"
			>
				<option
					v-for="currency in currencies"
					:key="currency.ID"
					:value="currency"
				>
					{{ currency.Name }}
				</option>
			</select>
		</div>

		<div class="col-auto">
			<button class="btn btn-primary" @click="change">Change</button>
		</div>

		<div class="col-auto">
			<label class="form-label">To</label>
			<select
				class="form-select form-select mb-3"
				aria-label=".form-select-lg example"
				v-model.number="secondCurrency"
				@change="convert"
			>
				<option
					v-for="currency in currencies"
					:key="currency.ID"
					:value="currency"
				>
					{{ currency.Name }}
				</option>
			</select>
		</div>
	</div>

	<div>
		<h3>{{ result }}</h3>
	</div>
</template>

<style scoped>
.btn {
	margin-top: 32px;
}
</style>
