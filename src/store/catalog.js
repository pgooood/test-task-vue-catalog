
import { defineStore } from 'pinia';
import axios from "axios";

export const useCatalogStore = defineStore('catalog', {

	state: () => {
		return {
			// товары сгруппированные по категориям
			tree: [],
			// плоский список товаров имеющий в индексе id товара
			goods: {},
			// курс валюты - случайное число от 20 до 80
			currencyRate: 0
		}
	},

	getters: {
		loaded() {
			return this.tree && this.tree.length > 0
		},
	},

	actions: {
		/**
		 * Получает данные о товарах, инициализирует переменные
		 * @returns 
		 */
		async fetchData() {
			let [goods, names] = await Promise.all([
				axios.get(`data.json`),
				axios.get(`names.json`)
			]);
			let result = {}
			let oldGoods = this.goods || {}
			this.tree = []
			this.goods = {}
			this.currencyRate = Math.floor(Math.random() * 60) + 20
			goods.data.Value.Goods.forEach(item => {
				const groupId = item.G,
					productId = parseInt(item.T),
					group = names.data[groupId],
					product = names.data[groupId].B[productId],
					oldProduct = oldGoods[productId],
					priceRub = item.C * this.currencyRate
				if (!result[groupId])
					result[groupId] = {
						id: parseInt(groupId),
						name: group.G,
						products: []
					};
				this.goods[productId] = {
					id: productId,
					name: product.N,
					price: {
						usd: item.C,
						rub: priceRub,
						delta: oldProduct ? oldProduct.price.rub - priceRub : 0
					},
					quantity: item.P
				}
				result[groupId].products.push(this.goods[productId]);
			})
			this.tree = Object.values(result)

		},
	},
})
