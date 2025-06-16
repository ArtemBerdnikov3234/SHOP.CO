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

const router = useRouter()
const productStore = useProductStore()

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
})

const itemsPerLoad = 8
const displayedCount = ref(itemsPerLoad)

const isLoading = computed(() => productStore.isLoading)

const displayedProducts = computed(() => {
  return productStore.products.slice(0, displayedCount.value)
})

const canLoadMore = computed(() => {
  return !isLoading.value && displayedCount.value < productStore.products.length
})

const loadMoreProducts = () => {
  if (canLoadMore.value) {
    displayedCount.value += itemsPerLoad
  }
}

const handleSelectProduct = ({ id }) => router.push({ name: 'ProductDetail', params: { id } })
</script>
