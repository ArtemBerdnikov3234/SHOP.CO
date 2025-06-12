<template>
  <div
    class="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer border border-gray-100 hover:-translate-y-1 hover:shadow-lg flex flex-col"
    @click="$emit('select-product', product)"
    role="article"
    :aria-labelledby="`product-name-${product?.id || 'default'}`"
  >
    <div class="relative">
      <div class="w-full h-64 bg-gray-100 flex items-center justify-center">
        <!-- Изображение товара -->
        <img
          v-if="product?.imageUrl && !imageLoadError"
          :src="product.imageUrl"
          :alt="product.name || 'Товар'"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
          @error="imageLoadError = true"
          loading="lazy"
        />

        <!-- Заглушка при отсутствии изображения -->
        <div v-else class="flex flex-col items-center text-gray-600">
          <svg
            class="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-xs">{{ product?.name || 'Без названия' }}</span>
        </div>
      </div>

      <!-- Бейдж скидки -->
      <span
        v-if="product?.displayDiscount"
        class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
      >
        {{ product.displayDiscount }}
      </span>
    </div>

    <div class="p-5 flex flex-col flex-grow">
      <h3
        :id="`product-name-${product?.id || 'default'}`"
        class="text-lg font-bold mb-2 text-black min-h-[4rem] line-clamp-2 overflow-hidden"
        :title="product?.name || 'Без названия'"
      >
        {{ product?.name || 'Без названия' }}
      </h3>

      <!-- Рейтинг с поддержкой полузвезд -->
      <div class="flex items-center gap-1.5 mb-2 text-sm">
        <div
          class="flex items-center"
          :aria-label="`Рейтинг: ${product?.rating?.toFixed(1) || 0} из 5`"
        >
          <template v-for="i in 5" :key="`star-${product?.id || 'default'}-${i}`">
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="getStarClass(i, product?.rating)"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
              <!-- Маска для полузвезды -->
              <defs v-if="isHalfStar(i, product?.rating)">
                <clipPath :id="`half-star-mask-${product?.id || 'default'}-${i}`">
                  <rect x="0" y="0" width="10" height="20" />
                </clipPath>
              </defs>
              <path
                v-if="isHalfStar(i, product?.rating)"
                :clip-path="`url(#half-star-mask-${product?.id || 'default'}-${i})`"
                class="text-yellow-400"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </template>
        </div>
        <span class="text-gray-600 font-medium">{{ product?.rating?.toFixed(1) || '0.0' }}</span>
      </div>

      <!-- Цены -->
      <div class="mt-auto">
        <div class="flex items-baseline gap-2 flex-wrap">
          <span class="text-xl font-bold text-black">
            ₽{{ product?.price?.toLocaleString() ?? 'N/A' }}
          </span>
          <span v-if="product?.oldPrice" class="text-lg font-medium text-gray-400 line-through">
            ₽{{ product?.oldPrice.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Реактивная переменная для обработки ошибок загрузки изображения
const imageLoadError = ref(false)

// Пропсы компонента
defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: 'default-product-id',
      name: 'Название товара по умолчанию',
      imageUrl: null,
      rating: 0,
      price: 0,
      oldPrice: null,
      displayDiscount: null,
    }),
  },
})

// Логика отображения звезд рейтинга
const getStarClass = (index, rating = 0) => {
  if (index <= Math.floor(rating)) {
    return 'text-yellow-400'
  } else if (isHalfStar(index, rating)) {
    return 'text-gray-300'
  }
  return 'text-gray-300'
}

// Проверка на полузвезду
const isHalfStar = (index, rating = 0) => {
  return index === Math.ceil(rating) && rating % 1 !== 0
}
</script>
