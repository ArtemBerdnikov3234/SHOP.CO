<template>
  <!-- Компонент для выбора размера -->
  <div class="flex gap-3">
    <!-- Итерация по массиву размеров для создания кнопок -->
    <button
      v-for="size in sizes"
      :key="size"
      class="px-6 py-3 rounded-full text-base font-medium transition-colors cursor-pointer"
      :class="[
        modelValue === size ? 'bg-black text-white' : 'bg-gray-100 text-black/60 hover:bg-gray-200', // Динамические классы для выделения выбранного размера
      ]"
      @click="selectSize(size)"
    >
      {{ size }}
    </button>
  </div>
</template>

<script setup>
// Определение входных параметров (props)
defineProps({
  sizes: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
// Определение генерируемых событий (emits)
const emit = defineEmits(['update:modelValue'])
// Функция для отправки события `update:modelValue` с выбранным размером
const selectSize = (size) => emit('update:modelValue', size)
</script>
