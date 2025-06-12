<template>
  <div class="relative w-full pb-20">
    <div class="max-w-7xl mx-auto h-px bg-gray-200 mt-6 mb-8 md:mt-2 md:mb-12 px-4 md:px-0"></div>

    <div v-if="isLoading" class="text-center py-20">Загрузка данных о товаре...</div>

    <div v-if="product">
      <div class="container mx-auto max-w-7xl px-4 md:px-6">
        <!-- Основной блок товара -->
        <div class="flex flex-col lg:flex-row gap-x-10 xl:gap-x-20">
          <!-- Левая колонка: Галерея изображений -->
          <div class="lg:w-[50%] xl:w-[45%]">
            <ProductImageGallery :images="product.colors" />
          </div>

          <!-- Правая колонка: Информация о товаре -->
          <div class="lg:w-[50%] xl:w-[55%] pt-8 lg:pt-0">
            <ProductInfo :product="product" />
          </div>
        </div>

        <!-- Секция с отзывами -->
        <ProductReviewsSection
          v-if="product.reviews && product.reviews.length > 0"
          :reviews="product.reviews"
          class="mt-16 md:mt-24"
        />
        <div
          v-else-if="product.reviews"
          class="mt-16 md:mt-24 pt-8 border-t border-gray-200 text-center text-black/60"
        >
          Отзывов пока нет. Будьте первым!
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading && !error" class="text-center py-20">
      Товар с ID '{{ currentProductId }}' не найден.
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import ProductImageGallery from '@/components/product_detail/ProductImageGallery.vue'
import ProductInfo from '@/components/product_detail/ProductInfo.vue'
import ProductReviewsSection from '@/components/product_detail/ProductReviewsSection.vue'

// Текущий маршрут и ID товара
const route = useRoute()
const currentProductId = ref(route.params.id)

// Хранилище продуктов
const productStore = useProductStore()

// Данные о продукте, загрузка, ошибки
const product = computed(() => productStore.getProductById(currentProductId.value))
const isLoading = computed(() => productStore.isLoading)
const error = computed(() => productStore.error)

// Отслеживание изменения ID
watch(
  () => route.params.id,
  (newId) => {
    currentProductId.value = newId
    if (!product.value || productStore.products.length === 0) {
      ensureProductData()
    }
  },
)

// Загрузка данных о продукте
const ensureProductData = () => {
  if (productStore.products.length === 0 || !productStore.getProductById(currentProductId.value)) {
    productStore.fetchAllProducts()
  }
}

// Загрузка при монтировании
onMounted(() => {
  ensureProductData()
})
</script>
