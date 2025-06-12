import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const CART_API_URL = 'https://fd08c3fca32debb9.mokky.dev/Cart'

export const useCartStore = defineStore('cart', () => {
  // --- Состояние ---
  const items = ref([])

  // --- Геттеры ---
  const cartItems = computed(() => items.value)
  const cartTotalQuantity = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  const cartSubtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })
  const isEmpty = computed(() => items.value.length === 0)

  // --- Действия ---

  // Загружает товары из корзины с API
  async function fetchCartItems() {
    const response = await fetch(CART_API_URL)
    items.value = await response.json()
  }

  // Принудительно обновляет данные корзины с сервера
  async function refreshCartItems() {
    await fetchCartItems()
  }

  // Добавляет товар в корзину
  async function addItemToCart(productDetails) {
    const existingItemIndex = items.value.findIndex(
      (item) =>
        item.productId === productDetails.productId &&
        item.color === productDetails.color &&
        item.size === productDetails.size,
    )

    if (existingItemIndex > -1) {
      // Если товар уже есть, обновляем его количество
      const existingItem = items.value[existingItemIndex]
      const newQuantity = existingItem.quantity + productDetails.quantity
      const response = await fetch(`${CART_API_URL}/${existingItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      })
      const updatedItem = await response.json()
      items.value[existingItemIndex] = updatedItem
    } else {
      // Если товара нет, добавляем новый
      const response = await fetch(CART_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productDetails),
      })
      const newItem = await response.json()
      items.value.push(newItem)
    }
  }

  // Удаляет товар из корзины
  async function removeItemFromCart(cartItemId) {
    await fetch(`${CART_API_URL}/${cartItemId}`, {
      method: 'DELETE',
    })
    items.value = items.value.filter((item) => item.id !== cartItemId)
  }

  // Обновляет количество товара в корзине
  async function updateItemQuantity(cartItemId, quantity) {
    if (quantity < 1) {
      await removeItemFromCart(cartItemId)
      return
    }
    const response = await fetch(`${CART_API_URL}/${cartItemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    })
    const updatedItem = await response.json()
    const index = items.value.findIndex((item) => item.id === cartItemId)
    if (index !== -1) {
      items.value[index] = updatedItem
    }
  }

  // Автоматическая загрузка данных корзины при создании store
  fetchCartItems()

  return {
    items,
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
