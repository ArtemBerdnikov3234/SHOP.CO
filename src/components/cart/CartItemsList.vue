<template>
  <div>
    <div
      class="hidden lg:grid grid-cols-[100px_1fr_100px_150px_100px_50px] gap-4 pb-2 border-b border-gray-300 text-sm text-gray-600 font-medium"
    >
      <div class="col-start-2">Товар</div>
      <div class="text-center">Цена</div>
      <div class="text-center">Количество</div>
      <div class="text-center">Сумма</div>
      <div></div>
    </div>

    <div v-if="cartStore.cartItems.length" class="space-y-4">
      <CartItem v-for="item in cartStore.cartItems" :key="item.id" :item="item" />
    </div>
    <div v-else class="py-10 text-center text-xl text-gray-600">
      Корзина пуста.
      <router-link to="/shop" class="text-black hover:underline font-medium">
        Начать покупки
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()
</script>
