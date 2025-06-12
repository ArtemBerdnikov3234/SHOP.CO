<template>
  <div class="lg:w-[65%] xl:w-[70%]">
    <div
      class="hidden lg:grid grid-cols-[100px_1fr_100px_150px_100px_50px] gap-4 pb-2 border-b border-gray-300 mb-4 text-sm text-black/60 font-medium"
    >
      <div class="col-start-2">Товар</div>
      <div class="text-center">Цена</div>
      <div class="text-center">Количество</div>
      <div class="text-center">Сумма</div>
      <div></div>
      <!-- Пустая ячейка для кнопки удаления -->
    </div>

    <!-- Список товаров -->
    <div v-if="cartStore.isLoading && cartStore.cartItems.length === 0" class="text-center py-10">
      Загрузка товаров корзины...
    </div>
    <div v-else-if="cartStore.error" class="text-center py-10 text-red-500">
      Ошибка загрузки корзины: {{ cartStore.error }}
    </div>
    <div v-else-if="!cartStore.isEmpty">
      <CartItem v-for="item in cartStore.cartItems" :key="item.id" :item="item" />
    </div>
    <div v-else class="py-10 text-center text-xl text-black/60">
      Ваша корзина пуста.
      <router-link to="/shop" class="text-black hover:underline font-medium">
        Перейти к покупкам
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()

// Загрузка корзины при монтировании компонента, если она пуста

if (cartStore.items.length === 0) {
  cartStore.fetchCartItems()
}
</script>
