<template>
  <div
    class="group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-1 hover:shadow-lg flex flex-col"
    @click="$emit('select-product', product)"
  >
    <div class="relative">
      <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
          loading="lazy"
        />
      </div>
      <span
        v-if="product.displayDiscount"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
      >
        {{ product.displayDiscount }}
      </span>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3
        :id="`product-name-${product.id}`"
        class="text-lg font-bold mb-2 text-black min-h-[4rem] line-clamp-2 overflow-hidden"
        :title="product.name"
      >
        {{ product.name }}
      </h3>

      <div class="flex items-center gap-1.5 mb-2 text-sm">
        <div class="flex items-center">
          <template v-for="i in 5" :key="`star-${product.id}-${i}`">
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="getStarClass(i, product.rating)"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </template>
        </div>
        <span class="text-gray-600 font-medium">{{ product.rating.toFixed(1) }}</span>
      </div>

      <div class="mt-auto">
        <div class="flex items-baseline gap-2 flex-wrap">
          <span class="text-xl font-bold text-black"> ₽{{ product.price.toLocaleString() }} </span>
          <span v-if="product.oldPrice" class="text-lg font-medium text-gray-400 line-through">
            ₽{{ product.oldPrice.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
  },
})

const getStarClass = (index, rating) => {
  return index <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
}
</script>
