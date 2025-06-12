import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const PRODUCTS_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Items'

//Вспомогательная функция для преобразования данных продукта из API в нужный формат.

function transformProduct(product) {
  const { colors, sizes, discount } = product
  const isActiveDiscount = discount?.is_active

  return {
    ...product,
    imageUrl: colors?.[0]?.image ?? null,
    availableSizes: sizes?.map((s) => s.size) ?? [],
    reviews: product.reviews ?? [],
    oldPrice: isActiveDiscount ? discount.original_price : null,
    displayDiscount:
      isActiveDiscount && discount.discount_percentage > 0
        ? `-${discount.discount_percentage}%`
        : null,
  }
}

export const useProductStore = defineStore('products', () => {
  // --- Состояние ---
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // --- Геттеры ---
  const allProducts = computed(() => products.value)
  const getProductById = computed(
    () => (id) => products.value.find((p) => String(p.id) === String(id)),
  )

  // --- Действия ---
  // Загружает все товары с API, обрабатывает ошибки и состояние загрузки.

  async function fetchAllProducts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(PRODUCTS_API_URL)
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.statusText}`)
      }
      const rawProducts = await response.json()
      products.value = rawProducts.map(transformProduct)
    } catch (e) {
      error.value = e.message
      console.error('Ошибка при загрузке товаров:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Автоматическая загрузка данных при создании хранилища
  fetchAllProducts()

  return {
    products,
    isLoading,
    error,
    allProducts,
    getProductById,
    fetchAllProducts,
  }
})
