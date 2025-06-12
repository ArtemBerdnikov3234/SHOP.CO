<template>
  <div class="relative w-full pb-20">
    <div class="max-w-7xl mx-auto h-px bg-gray-200 mt-6 mb-8 md:mt-2 md:mb-12 px-4 md:px-0"></div>

    <div class="container mx-auto max-w-7xl px-4 md:px-6">
      <CartBreadcrumbs />

      <h1 class="text-3xl sm:text-4xl font-bold text-black mb-8">Ваша корзина</h1>

      <div class="flex flex-col lg:flex-row gap-x-8">
        <CartItemsList />
        <CartSummary />
      </div>
    </div>
  </div>
</template>

<script setup>
import CartBreadcrumbs from '@/components/cart/CartBreadcrumbs.vue'
import CartItemsList from '@/components/cart/CartItemsList.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
</script>
