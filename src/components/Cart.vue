<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/cart";
import { useCatalogStore } from "../store/catalog";
import { formatPrice } from "../utils";

const cartStore = useCartStore();
const catalogStore = useCatalogStore();
const totalQuantity = computed(() => cartStore.totalQuantity);
const cartItems = computed(() => cartStore.cartItems);
function setQuantity(input, item) {
	if (input.checkValidity()) {
		cartStore.set(item.id, input.value);
		input.classList.remove("is-invalid");
	} else input.classList.add("is-invalid");
}
</script>

<template>
	<div class="mb-4" v-if="catalogStore.loaded && totalQuantity">
		<h3 class="mb-3">
			Корзина <small>({{ totalQuantity }})</small>
		</h3>
		<table class="table">
			<colgroup>
				<col style="width: 50%" />
				<col style="width: 20%" />
				<col style="width: 20%" />
				<col style="width: 10%" />
			</colgroup>
			<thead class="border-top-0">
				<tr>
					<th scope="col">Наименование товара и описание</th>
					<th scope="col">Количество</th>
					<th scope="col" class="text-center">Цена</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in cartItems" :key="item.id">
					<td>{{ item.name }}</td>
					<td>
						<div class="input-group input-group-sm">
							<input type="number" class="form-control"
								v-model="item.quantity"
								min="1"
								:max="item.available"
								required
								step="1"
								size="8"
								@input="setQuantity($event.target, item)"
							/>
							<span class="input-group-text">шт.</span>
						</div>
					</td>
					<td class="text-end">
						{{ formatPrice(item.price) }}&nbsp;/&nbsp;шт.
					</td>
					<td class="text-center">
						<button class="btn btn-link" @click="cartStore.remove(item.id)">
							Удалить
						</button>
					</td>
				</tr>
				<tr>
					<td class="text-end" colspan="3">
						Общая стоимость:
						<b>{{ formatPrice(cartStore.totalSum) }}</b>
					</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>