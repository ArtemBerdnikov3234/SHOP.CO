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
        <!-- Фильтры (сайдбар) -->
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
              v-if="productStore.allProducts.length > 0 || productStore.isLoading"
              @apply-filters="handleApplyFilters"
              @close-filters="showMobileFilters = false"
              class="md:max-w-xs w-full"
            />
            <div v-else class="p-5 text-gray-500 md:w-72">Загрузка опций фильтра...</div>
          </div>
        </aside>

        <!-- Основной контент: Заголовок, Сортировка и Сетка товаров -->
        <div class="flex-grow mt-8 md:mt-0">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 class="text-3xl sm:text-4xl font-bold text-black mb-4 sm:mb-0">Все товары</h1>
            <div
              class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto"
            >
              <p class="text-black/60 text-sm whitespace-nowrap order-2 sm:order-1">
                Показано {{ paginatedProducts.length }} из {{ filteredAndSortedProducts.length }}
                <span v-if="filteredAndSortedProducts.length !== productStore.allProducts.length">
                  (всего {{ productStore.allProducts.length }})
                </span>
                товаров
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

          <!-- Сетка товаров -->
          <div
            v-if="isLoading && filteredAndSortedProducts.length === 0 && !productStore.error"
            class="text-center py-20"
          >
            <p class="text-xl">Загрузка товаров...</p>
          </div>
          <div v-else-if="productStore.error" class="text-center py-20 text-red-500">
            <p class="text-xl">Ошибка загрузки товаров: {{ productStore.error }}</p>
          </div>
          <div
            v-else-if="paginatedProducts.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            :class="
              showMobileFilters ? 'md:grid-cols-2 lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'
            "
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
              @select-product="handleSelectProduct"
            />
          </div>
          <div v-else-if="!isLoading" class="text-center py-20">
            <p class="text-xl text-gray-600">Товары, соответствующие вашим фильтрам, не найдены.</p>
            <button
              v-if="hasActiveFilters"
              @click="clearAllActiveFilters"
              class="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm"
            >
              Сбросить все фильтры
            </button>
          </div>

          <div v-if="canLoadMorePaginated" class="mt-12 text-center">
            <button
              @click="loadMorePaginatedProducts"
              class="px-8 py-3 border border-gray-300 rounded-full text-black hover:bg-gray-100 transition-colors"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Загрузка...' : 'Загрузить еще' }}
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

const itemsPerLoad = 9
const displayedCount = ref(itemsPerLoad)
const currentSort = ref('default')
const showMobileFilters = ref(false)

const activeFilters = reactive({
  categories: [],
  priceRange: { min: null, max: null },
  colors: [],
  sizes: [],
})

const handleApplyFilters = (newFilters) => {
  Object.assign(activeFilters, newFilters)
  displayedCount.value = itemsPerLoad
}

const isLoading = computed(() => productStore.isLoading)

const filteredProducts = computed(() => {
  let products = [...productStore.allProducts]
  if (activeFilters.categories.length > 0) {
    products = products.filter((p) => {
      const productCategory = (p.category || p.dress_style || '').toLowerCase()
      return activeFilters.categories.includes(productCategory)
    })
  }
  if (activeFilters.priceRange.min !== null && activeFilters.priceRange.min !== '') {
    products = products.filter((p) => p.price >= Number(activeFilters.priceRange.min))
  }
  if (activeFilters.priceRange.max !== null && activeFilters.priceRange.max !== '') {
    products = products.filter((p) => p.price <= Number(activeFilters.priceRange.max))
  }
  if (activeFilters.colors.length > 0) {
    products = products.filter(
      (p) =>
        p.colors && p.colors.some((colorOption) => activeFilters.colors.includes(colorOption.hex)),
    )
  }
  if (activeFilters.sizes.length > 0) {
    products = products.filter(
      (p) =>
        p.availableSizes &&
        p.availableSizes.some((sizeOption) => activeFilters.sizes.includes(sizeOption)),
    )
  }
  return products
})

const filteredAndSortedProducts = computed(() => {
  const productsToSort = [...filteredProducts.value]
  switch (currentSort.value) {
    case 'price_asc':
      return productsToSort.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return productsToSort.sort((a, b) => b.price - a.price)
    case 'rating_desc':
      return productsToSort.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    case 'name_asc':
      return productsToSort.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return productsToSort
  }
})

const paginatedProducts = computed(() => {
  return filteredAndSortedProducts.value.slice(0, displayedCount.value)
})

const canLoadMorePaginated = computed(() => {
  return !isLoading.value && displayedCount.value < filteredAndSortedProducts.value.length
})

const loadMorePaginatedProducts = () => {
  if (canLoadMorePaginated.value) {
    displayedCount.value += itemsPerLoad
  }
}

const handleSelectProduct = (product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

const hasActiveFilters = computed(() => {
  const defaultMin =
    productStore.allProducts.length > 0
      ? Math.floor(Math.min(...productStore.allProducts.map((p) => p.price)) / 100) * 100
      : 0
  const defaultMax =
    productStore.allProducts.length > 0
      ? Math.ceil(Math.max(...productStore.allProducts.map((p) => p.price)) / 100) * 100
      : 10000

  return (
    activeFilters.categories.length > 0 ||
    activeFilters.colors.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.priceRange.min !== defaultMin ||
    activeFilters.priceRange.max !== defaultMax
  )
})

const clearAllActiveFilters = () => {
  const defaultMin =
    productStore.allProducts.length > 0
      ? Math.floor(Math.min(...productStore.allProducts.map((p) => p.price)) / 100) * 100
      : 0
  const defaultMax =
    productStore.allProducts.length > 0
      ? Math.ceil(Math.max(...productStore.allProducts.map((p) => p.price)) / 100) * 100
      : 10000

  handleApplyFilters({
    categories: [],
    priceRange: { min: defaultMin, max: defaultMax },
    colors: [],
    sizes: [],
  })
}

onMounted(() => {
  if (productStore.allProducts.length === 0) {
    productStore.fetchAllProducts()
  }
})
</script>
