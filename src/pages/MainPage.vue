<script setup>
import { ref, computed } from 'vue';
import CurrenciesTab from './CurrenciesTab.vue';
import ConverterTab from './ConverterTab.vue';

const tab = ref(0);
const tabs = [CurrenciesTab, ConverterTab];
const currentTab = computed(() => tabs[tab.value]);
</script>

<template>
	<div class="container">
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item">
						<a
							@click="tab = 0"
							class="nav-link"
							active-class="active"
							aria-current="true"
							href="#"
							>Currency list</a
						>
					</li>
					<li class="nav-item">
						<a @click="tab = 1" class="nav-link" active-class="active" href="#"
							>Converter</a
						>
					</li>
				</ul>
			</div>
			<div class="card-body">
				<KeepAlive>
					<component :is="currentTab"></component>
				</KeepAlive>
			</div>
		</div>
	</div>
</template>
