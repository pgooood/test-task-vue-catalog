import { defineStore } from 'pinia';
import { useCatalogStore } from './catalog.js';

export const useCartStore = defineStore('cart', {

	state: () => {
		return {
			items: JSON.parse(localStorage.getItem('cartData')) || {}
		}
	},

	actions: {
		add(productId) {
			if (!this.items[productId])
				this.items[productId] = {
					productId,
					quantity: 0,
				};
			this.items[productId].quantity += 1
		},

		set(productId, quantity) {
			if (!this.items[productId])
				this.items[productId] = {
					productId,
					quantity: 0,
				};
			this.items[productId].quantity = parseInt(quantity)
		},

		remove(productId) {
			if (this.items[productId])
				delete this.items[productId]
		},
	},

	getters: {
		totalQuantity() {
			return Object.keys(this.items).reduce((num, id) => {
				return num + this.items[id].quantity
			}, 0)
		},

		totalSum() {
			const catalog = useCatalogStore();
			return Object.keys(this.items).reduce((sum, id) => {
				return sum + catalog.goods[id].price.rub * this.items[id].quantity
			}, 0)
		},

		cartItems() {
			const catalog = useCatalogStore()
			if (!catalog.loaded)
				return [];
			return Object.keys(this.items).map((productId) => {
				const cartItem = this.items[productId]
				const product = catalog.goods[cartItem.productId]
				return {
					id: product.id,
					name: product.name,
					available: product.quantity,
					quantity: cartItem.quantity,
					price: product.price.rub,
					cost: cartItem.quantity * product.price.rub,
				};
			});
		},
	},

});