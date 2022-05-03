<script setup>
import { computed } from "vue";
import { useCatalogStore } from "../store/catalog";
import CatalogGroup from "./CatalogGroup.vue";

const catalogStore = useCatalogStore();
const catalog = computed(() => catalogStore.tree);
</script>

<template>
	<div>
		<h3 class="mb-3">Каталог товаров</h3>
		<CatalogGroup v-for="group in catalog" :key="group.id" :group="group" />
	</div>
</template>