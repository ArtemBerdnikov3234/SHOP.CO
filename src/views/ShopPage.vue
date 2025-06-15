<template>
  <div class="relative w-full pb-20">
    <div class="max-w-7xl mx-auto h-px bg-gray-200 mt-6 mb-8 md:mt-2 md:mb-12 px-4 md:px-0"></div>

    <div class="shop-page-container container mx-auto max-w-7xl px-4 md:px-6">
      <!-- Хлебные крошки -->
      <div class="flex items-center gap-2 text-base mb-6">
        <router-link to="/" class="text-black/60 hover:text-black transition-colors">
          Главная
        </router-link>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="#000000"
            stroke-opacity="0.6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="text-black font-medium">Магазин</span>
      </div>

      <!-- Кнопка фильтров для мобильных -->
      <div class="flex justify-end items-center mb-4 md:hidden">
        <button
          @click="showMobileFilters = true"
          class="p-2 border rounded-md text-gray-700 hover:bg-gray-100 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M3.75 6H7.5m3 12h9.75m-9.75 6h9.75M3.75 12H7.5m-3.75 6H7.5m0 0V6"
            />
          </svg>
          <span class="text-sm">Фильтры</span>
        </button>
      </div>

      <div class="flex flex-col md:flex-row md:items-start gap-x-6 lg:gap-x-8">
        <!-- Фильтры -->
        <div
          v-if="showMobileFilters"
          class="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          @click="showMobileFilters = false"
        ></div>
        <aside
          :class="[
            'md:block transition-transform duration-300 ease-in-out',
            showMobileFilters
              ? 'fixed top-0 left-0 h-full w-full max-w-xs bg-white z-40 overflow-y-auto shadow-xl'
              : 'hidden -translate-x-full md:translate-x-0',
          ]"
        >
          <div class="md:sticky md:top-24 md:self-start">
            <ShopFilters
              @apply-filters="handleApplyFilters"
              @close-filters="showMobileFilters = false"
            />
          </div>
        </aside>

        <!-- Основной контент -->
        <div class="flex-grow mt-8 md:mt-0">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-0">Все товары</h1>
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto"
            >
              <p class="text-black/60 text-sm whitespace-nowrap order-2 sm:order-1">
                Показано {{ paginatedProducts.length }} из
                {{ filteredAndSortedProducts.length }} товаров
              </p>
              <div class="relative w-full sm:w-auto order-1 sm:order-2">
                <select
                  v-model="currentSort"
                  class="bg-gray-100 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 appearance-none pr-8"
                >
                  <option value="default">По умолчанию</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="rating_desc">Рейтинг: высокий</option>
                  <option value="name_asc">Название: А-Я</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5.516 7.548c.436-.446 1.043-.48 1.576 0L10 10.405l2.908-2.857c.533-.48 1.14-.446 1.576 0 .436.445.408 1.197 0 1.615l-3.72 3.72c-.436.446-1.043.48-1.576 0l-3.72-3.72c-.408-.418-.436-1.17 0-1.615z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Товары -->
          <div v-if="isLoading" class="text-center py-20">
            <p class="text-xl">Загрузка товаров...</p>
          </div>
          <div v-else-if="productStore.error" class="text-center py-20 text-red-500">
            <p class="text-xl">Ошибка загрузки товаров: {{ productStore.error }}</p>
          </div>
          <div
            v-else-if="paginatedProducts.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
              @select-product="handleSelectProduct"
            />
          </div>
          <div v-else class="text-center py-20">
            <p class="text-xl text-gray-600">Товары не найдены</p>
          </div>

          <!-- Кнопка "Загрузить еще" -->
          <div v-if="canLoadMore" class="mt-12 text-center">
            <button
              @click="loadMoreProducts"
              class="px-8 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-100 transition-colors"
            >
              Загрузить еще
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/main/ProductCard.vue'
import ShopFilters from '@/components/shop/ShopFilters.vue'

const router = useRouter()
const productStore = useProductStore()

// Состояние
const itemsPerLoad = 9
const displayedCount = ref(itemsPerLoad)
const currentSort = ref('default')
const showMobileFilters = ref(false)
const isLoading = computed(() => productStore.isLoading)

const activeFilters = reactive({
  categories: [],
  priceRange: { min: null, max: null },
  colors: [],
  sizes: [],
})

// Фильтрация товаров
const filteredProducts = computed(() => {
  return productStore.allProducts.filter((product) => {
    // Фильтр по категории
    if (activeFilters.categories.length > 0) {
      if (!activeFilters.categories.includes(product.category)) {
        return false
      }
    }

    // Фильтр по цене
    if (activeFilters.priceRange.min !== null && product.price < activeFilters.priceRange.min) {
      return false
    }
    if (activeFilters.priceRange.max !== null && product.price > activeFilters.priceRange.max) {
      return false
    }

    // Фильтр по цвету
    if (activeFilters.colors.length > 0) {
      const productColors = product.colors.map((c) => c.hex)
      if (!activeFilters.colors.some((color) => productColors.includes(color))) {
        return false
      }
    }

    // Фильтр по размеру
    if (activeFilters.sizes.length > 0) {
      const productSizes = product.sizes.map((s) => s.size)
      if (!activeFilters.sizes.some((size) => productSizes.includes(size))) {
        return false
      }
    }

    return true
  })
})

// Сортировка товаров
const filteredAndSortedProducts = computed(() => {
  const products = [...filteredProducts.value]

  switch (currentSort.value) {
    case 'price_asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return products.sort((a, b) => b.price - a.price)
    case 'rating_desc':
      return products.sort((a, b) => b.rating - a.rating)
    case 'name_asc':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return products
  }
})

// Пагинация
const paginatedProducts = computed(() => {
  return filteredAndSortedProducts.value.slice(0, displayedCount.value)
})

const canLoadMore = computed(() => {
  return displayedCount.value < filteredAndSortedProducts.value.length
})

// Методы
const handleApplyFilters = (newFilters) => {
  Object.assign(activeFilters, newFilters)
  displayedCount.value = itemsPerLoad
  showMobileFilters.value = false
}

const loadMoreProducts = () => {
  displayedCount.value += itemsPerLoad
}

const handleSelectProduct = (product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

onMounted(() => {
  if (productStore.allProducts.length === 0) {
    productStore.fetchAllProducts()
  }
})
</script>
