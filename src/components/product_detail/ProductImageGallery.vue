<template>
  <div class="relative w-full aspect-[4/5]">
    <img
      class="absolute inset-0 w-full h-full object-cover rounded-2xl bg-gray-100"
      :src="image"
      alt="Изображение товара"
    />
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
  },
})
</script>
