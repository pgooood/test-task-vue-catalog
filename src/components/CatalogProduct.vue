<script setup>
import { useCartStore } from "../store/cart";
import { formatPrice } from "../utils";

defineProps({
	product: {
		type: Object,
		required: true,
	},
});

const cartStore = useCartStore();
function priceClass(product) {
	if (!product.price.delta) return "";
	return product.price.delta > 0 ? "text-success" : "text-danger";
}
</script>

<template>
	<li class="list-group-item py-0">
		<div class="row">
			<div class="col-md-8 py-2">
				{{ product.name }}
				<small class="text-muted">({{ product.quantity }})</small>
			</div>
			<div class="col-md-2 py-2 text-center bg-light">
				<span :class="priceClass(product)">{{
					formatPrice(product.price.rub)
				}}</span>
			</div>
			<div class="col-md-2 py-2 text-center">
				<button class="btn btn-link" @click="cartStore.add(product.id)">
					В корзину
				</button>
			</div>
		</div>
	</li>
</template>