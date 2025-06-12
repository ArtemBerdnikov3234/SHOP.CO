<template>
  <div>
    <HeroSection />
    <BrandsSection />
    <ProductsSection
      title="Новая коллекция"
      :products="displayedProducts"
      :is-loading="isLoading"
      :can-load-more="canLoadMore"
      @select-product="handleSelectProduct"
      @load-more="loadMoreProducts"
      id="products-section"
    />
    <ShopByStyleSection />
    <ReviewsSection :reviews="customerReviews" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import HeroSection from '@/components/main/HeroSection.vue'
import BrandsSection from '@/components/main/BrandsSection.vue'
import ProductsSection from '@/components/main/ProductsSection.vue'
import ShopByStyleSection from '@/components/main/ShopByStyleSection.vue'
import ReviewsSection from '@/components/main/ReviewsSection.vue'

// Роутер и хранилище
const router = useRouter()
const productStore = useProductStore()

// URL и массив для отзывов
const REVIEWS_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Reviews'
const customerReviews = ref([])

// Загрузка отзывов и продуктов
onMounted(async () => {
  try {
    const reviewsResponse = await fetch(REVIEWS_API_URL)
    customerReviews.value = await reviewsResponse.json()
  } catch (error) {
    console.error('Ошибка загрузки отзывов:', error)
  }
  if (productStore.products.length === 0) {
    productStore.fetchAllProducts()
  }
})

// Кол-во продуктов за раз
const itemsPerLoad = 8
// Кол-во отображаемых продуктов
const displayedCount = ref(itemsPerLoad)

// Статус загрузки
const isLoading = computed(() => productStore.isLoading)

// Список отображаемых продуктов
const displayedProducts = computed(() => {
  return productStore.allProducts.slice(0, displayedCount.value)
})

// Возможность загрузить еще
const canLoadMore = computed(() => {
  return !isLoading.value && displayedCount.value < productStore.allProducts.length
})

// Загрузка дополнительных продуктов
const loadMoreProducts = () => {
  if (canLoadMore.value) {
    displayedCount.value += itemsPerLoad
  }
}

// Переход на страницу продукта
const handleSelectProduct = (product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}
</script>
