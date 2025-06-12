<template>
  <div
    class="relative rounded-2xl overflow-hidden cursor-pointer group w-full h-full bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    @click="$emit('select-style', styleItem.name)"
  >
    <!-- Фоновый слой для изображения. -->
    <div class="absolute inset-0">
      <img
        v-if="styleItem.imageUrl && imageSuccessfullyLoaded"
        :src="styleItem.imageUrl"
        :alt="styleItem.name"
        class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        @load="onImageLoad"
        @error="onImageError"
      />
    </div>

    <!-- Текст поверх -->
    <div class="absolute top-0 left-0 p-4 sm:p-5 text-black z-10">
      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
        {{ styleItem.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  styleItem: {
    type: Object,
    required: true,
    default: () => ({
      id: 'default',
      name: 'Стиль',
      imageUrl: null,
    }),
  },
})

defineEmits(['select-style'])

const imageSuccessfullyLoaded = ref(false)

const checkImage = (url) => {
  if (!url) {
    imageSuccessfullyLoaded.value = false
    return
  }
  imageSuccessfullyLoaded.value = false
  const img = new Image()
  img.onload = () => {
    imageSuccessfullyLoaded.value = true
  }
  img.onerror = () => {
    imageSuccessfullyLoaded.value = false
  }
  img.src = url
}

watch(
  () => props.styleItem.imageUrl,
  (newUrl) => {
    checkImage(newUrl)
  },
  { immediate: true },
)

const onImageLoad = () => {
  imageSuccessfullyLoaded.value = true
}
const onImageError = () => {
  imageSuccessfullyLoaded.value = false
}
</script>

<style scoped>
.drop-shadow-lg {
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
}
</style>
