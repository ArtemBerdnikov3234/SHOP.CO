<template>
  <!-- Основной контейнер, отображается, если есть изображения -->
  <div v-if="images && images.length > 0" class="flex flex-col md:flex-row gap-4 items-start">
    <!-- Контейнер для миниатюр изображений -->
    <div
      class="flex md:flex-col gap-[14px] order-2 md:order-1 w-full md:w-auto overflow-x-auto md:overflow-x-visible pb-2 md:pb-0"
    >
      <img
        v-for="(imageInfo, index) in images"
        :key="imageInfo.image + index"
        class="w-[80px] h-[90px] md:w-[100px] md:h-[110px] lg:w-[120px] lg:h-[132px] object-cover cursor-pointer hover:opacity-80 transition-opacity border-2 rounded-lg flex-shrink-0"
        :class="{
          'border-black shadow-lg': selectedImageIndex === index, // Динамические классы для выделения активной миниатюры
          'border-transparent hover:border-gray-300': selectedImageIndex !== index,
        }"
        :src="imageInfo.image"
        alt="Маленькое изображение товара"
        @click="selectImage(index)"
      />
    </div>

    <!-- Главное изображение товара -->
    <div class="relative w-full aspect-[4/5] order-1 md:order-2 md:flex-1">
      <img
        class="absolute inset-0 w-full h-full object-cover rounded-2xl bg-gray-100"
        :src="currentImage"
        alt="Главное изображение товара"
      />
    </div>
  </div>
  <!-- Отображается, если изображения отсутствуют -->
  <div
    v-else
    class="w-full aspect-[4/5] flex items-center justify-center bg-gray-100 rounded-2xl text-gray-500"
  >
    Нет изображения
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Входные параметры: массив изображений
const props = defineProps({
  images: { type: Array, default: () => [] },
})

// Реактивная переменная для хранения индекса выбранного изображения
const selectedImageIndex = ref(0)

// Наблюдатель за изменением `props.images`, сбрасывает выбор на первое изображение при обновлении
watch(
  () => props.images,
  () => {
    selectedImageIndex.value = 0
  },
  { deep: true, immediate: true }, // immediate: true, чтобы первое изображение выбиралось сразу при загрузке
)

// Вычисляемое свойство для получения URL текущего главного изображения
const currentImage = computed(() => {
  return props.images[selectedImageIndex.value]?.image || ''
})

// Функция для обновления индекса выбранного изображения
const selectImage = (index) => {
  selectedImageIndex.value = index
}
</script>
