<template>
  <div class="lg:w-[35%] xl:w-[30%] mt-10 lg:mt-0 lg:pl-8">
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mb-4">Сумма заказа</h3>

      <div class="space-y-3 mb-6">
        <div class="flex justify-between text-base">
          <span>Цена:</span>
          <span class="font-medium">₽{{ cartStore.subtotal || 0 }}</span>
        </div>
        <div class="flex justify-between text-base">
          <span>Доставка:</span>
          <span class="font-medium">{{ shipping > 0 ? `₽${shipping}` : 'Бесплатно' }}</span>
        </div>
      </div>

      <div class="border-t pt-4 mb-6">
        <div class="flex justify-between text-lg font-semibold">
          <span>Итог:</span>
          <span>₽{{ total }}</span>
        </div>
      </div>

      <button
        class="w-full bg-black text-white py-3 rounded-2xl hover:bg-gray-800 disabled:opacity-50"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const shipping = computed(() => (cartStore.subtotal >= 2000 ? 0 : 300))

const total = computed(() => cartStore.subtotal + shipping.value)
</script>
