<template>
  <section class="py-10" id="products-section">
    <div class="container mx-auto max-w-7xl px-4 md:px-6">
      <h2 class="text-5xl font-bold text-center mb-12 text-black">
        {{ title }}
      </h2>
      <div
        v-if="products.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @select-product="$emit('select-product', product)"
        />
      </div>
      <div v-else class="text-center text-gray-500 mb-10">Товары скоро появятся...</div>
      <button
        v-if="canLoadMore"
        class="block mx-auto bg-transparent border border-gray-200 py-4 px-12 rounded-full text-base font-medium text-black transition-all duration-300 hover:bg-gray-100 hover:border-black"
        @click="$emit('load-more')"
      >
        Посмотреть ещё
      </button>
    </div>
  </section>
</template>
ф
<script setup>
import ProductCard from './ProductCard.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  canLoadMore: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select-product', 'load-more'])
</script>
