<template>
  <div
    v-if="item"
    class="grid grid-cols-[80px_1fr_auto] md:grid-cols-[100px_1fr_100px_150px_100px_50px] items-center gap-4 py-4 border-b"
  >
    <img :src="item.imageUrl" class="w-20 h-24 md:w-24 md:h-24 object-cover rounded" />

    <div class="flex flex-col gap-1">
      <h3 class="font-semibold text-base md:text-lg">{{ item.name }}</h3>
      <p class="text-sm text-gray-500">
        Цвет: {{ props.item.color }}, Размер: {{ props.item.size }}
      </p>
      <div class="md:hidden text-base">₽{{ item.price }}</div>
    </div>

    <div
      class="col-span-full md:col-span-4 grid grid-cols-3 md:grid-cols-subgrid items-center gap-4"
    >
      <div class="hidden md:block text-base text-center">₽{{ item.price }}</div>

      <div class="flex items-center justify-center gap-2">
        <button
          @click="handleQuantityUpdate(item.quantity - 1)"
          class="w-8 h-8 border rounded-full hover:bg-gray-100"
        >
          -
        </button>
        <span class="text-base w-8 text-center">{{ item.quantity }}</span>
        <button
          @click="handleQuantityUpdate(item.quantity + 1)"
          class="w-8 h-8 border rounded-full hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div class="text-base font-semibold text-center">
        ₽{{ (item.price * item.quantity).toFixed(2) }}
      </div>

      <button
        @click="handleRemoveItem"
        class="text-gray-400 hover:text-red-500 p-2 flex justify-end md:justify-center"
      >
        <svg class="w-5 h-5" viewBox="0 0 18 20" fill="currentColor">
          <path
            d="M17.25 3.5H13.5V2.75C13.5 1.58 12.84 0.5 11.25 0.5H6.75C5.16 0.5 4.5 1.58 4.5 2.75V3.5H0.75C0.34 3.5 0 3.84 0 4.25S0.34 5 0.75 5H1.5V18.5C1.5 19.33 2.17 20 3 20H15C15.83 20 16.5 19.33 16.5 18.5V5H17.25C17.66 5 18 4.66 18 4.25S17.66 3.5 17.25 3.5ZM12 3.5H6V2.75C6 2.34 6.34 2 6.75 2H11.25C11.66 2 12 2.34 12 2.75V3.5ZM7.5 14.75C7.5 15.16 7.16 15.5 6.75 15.5S6 15.16 6 14.75V8.75C6 8.34 6.34 8 6.75 8S7.5 8.34 7.5 8.75V14.75ZM12 14.75C12 15.16 11.66 15.5 11.25 15.5S10.5 15.16 10.5 14.75V8.75C10.5 8.34 10.84 8 11.25 8S12 8.34 12 8.75V14.75Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  item: { type: Object },
})

const cartStore = useCartStore()

const handleQuantityUpdate = (quantity) => cartStore.updateQuantity(props.item.id, quantity)

const handleRemoveItem = () => {
  cartStore.removeItem(props.item.id)
}
</script>
