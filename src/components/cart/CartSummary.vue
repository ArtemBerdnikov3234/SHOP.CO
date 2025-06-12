<template>
  <div class="lg:w-[35%] xl:w-[30%] mt-10 lg:mt-0 lg:pl-8">
    <div class="bg-gray-50 p-6 rounded-lg shadow">
      <!-- Заголовок -->
      <h3 class="text-xl font-semibold mb-4 text-black">Сумма заказа</h3>

      <!-- Ввод промокода -->
      <div class="mb-6">
        <div class="flex gap-2">
          <input
            v-model="promoCode"
            type="text"
            placeholder="Введите промокод"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-[24px] focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm"
          />
          <button
            @click="togglePromo"
            :disabled="(!promoCode.trim() && !activePromo) || cartStore.isEmpty"
            class="px-4 py-2 bg-black text-white text-sm font-medium rounded-[24px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ activePromo ? 'Отменить' : 'Применить' }}
          </button>
        </div>
        <div v-if="message" class="mt-2 text-sm" :class="messageClass">
          {{ message }}
        </div>
      </div>

      <!-- Детали заказа -->
      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-base">
          <span class="text-black/80">Подытог:</span>
          <span class="font-medium text-black">₽{{ cartStore.cartSubtotal.toFixed(2) }}</span>
        </div>
        <div v-if="discount > 0" class="flex justify-between text-base">
          <span class="text-black/80">Скидка:</span>
          <span class="font-medium text-green-600">- ₽{{ discount.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-base">
          <span class="text-black/80">Доставка:</span>
          <span class="font-medium text-black">{{
            shipping > 0 ? `₽${shipping.toFixed(2)}` : 'Бесплатно'
          }}</span>
        </div>
      </div>

      <!-- Итоговая сумма -->
      <div class="border-t border-gray-200 pt-4 mb-6">
        <div class="flex justify-between text-lg font-semibold">
          <span class="text-black">Итого:</span>
          <span class="text-black">₽{{ total.toFixed(2) }}</span>
        </div>
      </div>

      <!-- Кнопка оформления -->
      <button
        @click="proceedToCheckout"
        :disabled="cartStore.isEmpty"
        class="w-full bg-black text-white font-medium py-3 rounded-[24px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

// Промокоды
const promoCodes = {
  СКИДКА10: 10,
  СКИДКА500: 500,
  ДОСТАВКА: 'free_shipping',
}

const promoCode = ref('')
const activePromo = ref('')
const message = ref('')

// Вычисление скидки
const discount = computed(() => {
  if (!activePromo.value) return 0
  const value = promoCodes[activePromo.value]
  if (typeof value === 'number') {
    return value > 100 ? value : (cartStore.cartSubtotal * value) / 100
  }
  return 0
})

// Вычисление стоимости доставки
const shipping = computed(() => {
  if (activePromo.value === 'ДОСТАВКА' || cartStore.cartSubtotal >= 2000) {
    return 0
  }
  return 300
})

// Вычисление итоговой суммы
const total = computed(() => {
  return Math.max(0, cartStore.cartSubtotal - discount.value + shipping.value)
})

// Класс для сообщения
const messageClass = computed(() => {
  return message.value.includes('применён') ? 'text-green-600' : 'text-red-600'
})

// Переключение промокода
const togglePromo = () => {
  if (activePromo.value) {
    removePromo()
  } else {
    applyPromo()
  }
}

// Применение промокода
const applyPromo = () => {
  const code = promoCode.value.trim().toUpperCase()
  if (!promoCodes[code]) {
    showMessage('Промокод не найден')
    return
  }

  activePromo.value = code
  showMessage(`Промокод ${code} применён`)
}

// Удаление промокода
const removePromo = () => {
  activePromo.value = ''
  promoCode.value = ''
  message.value = ''
}

// Отображение сообщения
const showMessage = (text) => {
  message.value = text
  if (!text.includes('применён')) {
    setTimeout(() => (message.value = ''), 3000)
  }
}

// Оформление заказа
const proceedToCheckout = () => {
  if (cartStore.isEmpty) {
    alert('Ваша корзина пуста.')
    return
  }

  console.log('Оформление заказа:', {
    subtotal: cartStore.cartSubtotal,
    discount: discount.value,
    shipping: shipping.value,
    total: total.value,
    promoCode: activePromo.value,
  })
}
</script>
