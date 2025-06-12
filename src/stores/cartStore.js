import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Cart'

export const useCartStore = defineStore('cart', () => {
  // --- State ---
  const items = ref([]) // Товары в корзине
  const isLoading = ref(false)
  const error = ref(null)
  const isInitialized = ref(false) // Флаг инициализации

  // --- Getters ---
  const cartItems = computed(() => items.value)
  const cartTotalQuantity = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  const cartSubtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })
  const isEmpty = computed(() => items.value.length === 0)

  // --- Actions ---

  /**
   * Загружает товары из корзины с API.
   */
  async function fetchCartItems() {
    if (isInitialized.value) return // Если уже загружены, не перезагружать
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(CART_API_URL)
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.statusText}`)
      }
      items.value = await response.json()
      isInitialized.value = true
    } catch (e) {
      error.value = e.message
      console.error('Ошибка при загрузке корзины:', e)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Принудительно обновляет данные корзины с сервера
   */
  async function refreshCartItems() {
    isInitialized.value = false
    await fetchCartItems()
  }

  async function addItemToCart(productDetails) {
    isLoading.value = true
    error.value = null
    try {
      // Проверяем, есть ли уже такой товар (с таким же productId, цветом и размером)
      const existingItemIndex = items.value.findIndex(
        (item) =>
          item.productId === productDetails.productId &&
          item.color === productDetails.color &&
          item.size === productDetails.size,
      )

      if (existingItemIndex > -1) {
        // Если товар уже есть, увеличиваем его количество
        const existingItem = items.value[existingItemIndex]
        const newQuantity = existingItem.quantity + productDetails.quantity
        const response = await fetch(`${CART_API_URL}/${existingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        })
        if (!response.ok) {
          throw new Error('Не удалось обновить количество товара в корзине на сервере')
        }
        const updatedItem = await response.json()
        items.value[existingItemIndex] = updatedItem
      } else {
        // Если товара нет, добавляем новый
        const response = await fetch(CART_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productDetails),
        })
        if (!response.ok) {
          throw new Error('Не удалось добавить товар в корзину на сервере')
        }
        const newItem = await response.json()
        items.value.push(newItem)
      }
    } catch (e) {
      error.value = e.message
      console.error('Ошибка при добавлении в корзину:', e)
      // re-throw the error so the component can catch it
      throw e
    } finally {
      isLoading.value = false
    }
  }

  async function removeItemFromCart(cartItemId) {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${CART_API_URL}/${cartItemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Не удалось удалить товар из корзины на сервере')
      }
      items.value = items.value.filter((item) => item.id !== cartItemId)
    } catch (e) {
      error.value = e.message
      console.error('Ошибка при удалении из корзины:', e)
    } finally {
      isLoading.value = false
    }
  }

  async function updateItemQuantity(cartItemId, quantity) {
    if (quantity < 1) {
      await removeItemFromCart(cartItemId)
      return
    }
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(`${CART_API_URL}/${cartItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) {
        throw new Error('Не удалось обновить количество товара на сервере')
      }
      const updatedItem = await response.json()
      const index = items.value.findIndex((item) => item.id === cartItemId)
      if (index !== -1) {
        items.value[index] = updatedItem
      }
    } catch (e) {
      error.value = e.message
      console.error('Ошибка при обновлении количества:', e)
    } finally {
      isLoading.value = false
    }
  }

  // Автоматическая загрузка при создании store
  fetchCartItems()

  return {
    items,
    isLoading,
    error,
    isInitialized,
    cartItems,
    cartTotalQuantity,
    cartSubtotal,
    isEmpty,
    fetchCartItems,
    refreshCartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  }
})
