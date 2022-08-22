<script setup>
import { ref, onMounted, computed } from 'vue';
import { formatPrice } from '../assets/utils/format.js';
import CurrencyService from '../services/CurrencyService.js';

const currencies = ref(null);
const base = ref(null);
const quote = ref(null);

const baseValue = ref(null);
const quoteValue = ref(null);

const changeable = computed(() => base.value && quote.value);


onMounted(async () => {
	currencies.value = await CurrencyService.getAllCurrencies();
});

const calculateQuote = () => {
	if (!changeable.value || !baseValue.value) return;

	const baseCoefficient = base.value.coefficient;
	const quoteCoefficient = quote.value.coefficient;

	quoteValue.value = formatPrice((quoteCoefficient / baseCoefficient) * baseValue.value);
};

const calculateBase = () => {
	if (!changeable.value || !quoteValue.value) return;

	const baseCoefficient = base.value.coefficient;
	const quoteCoefficient = quote.value.coefficient;

	baseValue.value = formatPrice((baseCoefficient / quoteCoefficient) * quoteValue.value);
}

const change = () => {
	if (!changeable.value) return;
	const temp = {...base.value};
	base.value = quote.value;
	quote.value = temp;
	calculateQuote();
};
</script>

<template>
	<div class="row g3 justify-content-center m-3">
		<div class="col-auto">
			<label class="form-label">Amount</label>
			<input class="form-control" type="number" v-model.number="baseValue" @input="calculateQuote" />
		</div>

		<div class="col-auto">
			<label class="form-label">From</label>
			<select class="form-select form-select mb-3" aria-label=".form-select-lg example" v-model.number="base"
				@change="calculateQuote">
				<option v-for="currency in currencies" :key="currency.ID" :value="currency">
					{{ currency.Name }}
				</option>
			</select>
		</div>

		<div>
			<button class="btn btn-primary" @click="change">Change</button>
		</div>

		<div class="col-auto">
			<label class="form-label">Amount</label>
			<input class="form-control" type="number" v-model.number="quoteValue" @input="calculateBase" />
		</div>

		<div class="col-auto">
			<label class="form-label">To</label>
			<select class="form-select form-select mb-3" aria-label=".form-select-lg example" v-model.number="quote"
				@change="calculateQuote">
				<option v-for="currency in currencies" :key="currency.ID" :value="currency">
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
