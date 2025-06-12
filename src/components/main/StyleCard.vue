<template>
  <div
    class="relative rounded-2xl overflow-hidden cursor-pointer group w-full h-full bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
    @click="handleClick"
  >
    <!-- Фоновое изображение -->
    <div class="absolute inset-0">
      <img
        v-if="styleItem.imageUrl"
        :src="styleItem.imageUrl"
        :alt="styleItem.name"
        class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
    </div>

    <!-- Название стиля -->
    <div class="absolute top-0 left-0 p-4 sm:p-5 text-black z-10">
      <h3 class="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
        {{ styleItem.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
// Определяем пропсы
const props = defineProps({
  styleItem: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && typeof value.name === 'string' && value.imageUrl
    },
  },
})

// Определяем эмиты
const emit = defineEmits(['select-style'])

// Функция обработки клика
const handleClick = () => {
  emit('select-style', props.styleItem.name)
}
</script>

<style scoped>
.drop-shadow-lg {
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.4));
}
</style>
