import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = 'https://fd08c3fca32debb9.mokky.dev/Cart'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const cartItems = computed(() => items.value)
  const totalQuantity = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )
  const isEmpty = computed(() => items.value.length === 0)

  async function fetchCart() {
    const response = await fetch(API_URL)
    items.value = await response.json()
  }

  async function removeItem(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    items.value = items.value.filter((item) => item.id !== id)
  }

  async function updateQuantity(id, quantity) {
    if (quantity < 1) {
      await removeItem(id)
      return
    }
    const updatedItem = await sendRequest(`${API_URL}/${id}`, 'PATCH', { quantity })
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) items.value[index] = updatedItem
  }

  async function addItem(product) {
    const existingItem = items.value.find(
      (item) =>
        item.productId === product.productId &&
        item.color === product.color &&
        item.size === product.size,
    )

    const updatedQuantity = existingItem
      ? existingItem.quantity + product.quantity
      : product.quantity
    const method = existingItem ? 'PATCH' : 'POST'
    const url = existingItem ? `${API_URL}/${existingItem.id}` : API_URL
    const body = existingItem ? { quantity: updatedQuantity } : product

    const newItem = await sendRequest(url, method, body)

    if (existingItem) {
      const index = items.value.findIndex((item) => item.id === existingItem.id)
      items.value[index] = newItem
    } else {
      items.value.push(newItem)
    }
  }

  async function sendRequest(url, method, data) {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await response.json()
  }

  fetchCart()

  return {
    cartItems,
    totalQuantity,
    subtotal,
    isEmpty,
    fetchCart,
    addItem,
    removeItem,
    updateQuantity,
  }
})
