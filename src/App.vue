<script setup>
import { onUnmounted } from "vue";
import { useCartStore } from "./store/cart";
import { useCatalogStore } from "./store/catalog";
import Cart from "./components/Cart.vue";
import Catalog from "./components/Catalog.vue";
import { formatPrice } from "./utils";

// загрузка данных каталога товаров
const catalogStore = useCatalogStore();
catalogStore.fetchData();

// обновляем данные каждые 15 секунд
setInterval(() => {
	catalogStore.fetchData();
}, 15000);

// сохранение корзины
const cartStore = useCartStore();
const unsub = cartStore.$subscribe(() => {
	localStorage.setItem("cartData", JSON.stringify(cartStore.items));
});
onUnmounted(() => unsub());
</script>

<template>
	<header class="container my-4">
		<h1 class="display-3">Test Task</h1>
	</header>

	<main class="container">
		<p class="mb-4">
			Курс доллара: {{ formatPrice(catalogStore.currencyRate) }}
		</p>
		<Cart />
		<Catalog />
	</main>
</template>
