import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const PRODUCTS_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Items'

function transformProduct(product) {
  const { colors, sizes, discount } = product
  return {
    ...product,
    imageUrl: colors[0].image,
    availableSizes: sizes.map((size) => size.size),
    oldPrice: discount?.is_active ? discount.original_price : null,
    displayDiscount: discount?.is_active ? `-${discount.discount_percentage}%` : null,
  }
}

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const isLoading = ref(false)

  const getProductById = computed(
    () => (id) => products.value.find((p) => String(p.id) === String(id)),
  )

  async function fetchProducts() {
    isLoading.value = true
    try {
      const response = await fetch(PRODUCTS_API_URL)
      products.value = (await response.json()).map(transformProduct)
    } finally {
      isLoading.value = false
    }
  }

  fetchProducts()

  return { products, isLoading, getProductById, fetchProducts }
})
