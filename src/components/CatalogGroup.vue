<script setup>
import CatalogProduct from "./CatalogProduct.vue";
defineProps({
	group: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="card mb-3">
		<div class="card-header">
			<h4 class="h6">{{ group.name }}</h4>
		</div>
		<ul class="list-group list-group-flush">
			<CatalogProduct
				v-for="product in group.products"
				:key="product.id"
				:product="product"
			/>
		</ul>
	</div>
</template>
