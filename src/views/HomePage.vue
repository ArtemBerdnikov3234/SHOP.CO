<!-- views/HomePage.vue -->

<template>
  <div>
    <!-- Убираем обработчик @shop-now -->
    <HeroSection />

    <BrandsSection />
    <ProductsSection
      title="Новая колекция"
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

const router = useRouter()
const productStore = useProductStore()

const REVIEWS_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Reviews'
const customerReviews = ref([])
onMounted(async () => {
  try {
    const reviewsResponse = await fetch(REVIEWS_API_URL)
    customerReviews.value = await reviewsResponse.json()
  } catch (error) {
    console.error('Ошибка при выборке отзывов:', error)
  }

  if (productStore.products.length === 0) {
    productStore.fetchAllProducts()
  }
})

const itemsPerLoad = 8
const displayedCount = ref(itemsPerLoad)

const isLoading = computed(() => productStore.isLoading)

const displayedProducts = computed(() => {
  return productStore.allProducts.slice(0, displayedCount.value)
})

const canLoadMore = computed(() => {
  return !isLoading.value && displayedCount.value < productStore.allProducts.length
})

const loadMoreProducts = () => {
  if (canLoadMore.value) {
    displayedCount.value += itemsPerLoad
  }
}

const handleSelectProduct = (product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}
</script>
