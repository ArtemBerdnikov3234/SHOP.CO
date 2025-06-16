<template>
  <div class="flex gap-4">
    <button
      v-for="color in colors"
      :key="color.hex"
      class="w-9 h-9 rounded-full cursor-pointer border-2 border-gray-300/70"
      :style="{ backgroundColor: color.hex }"
      :class="{ 'ring-2 ring-black ring-offset-2': modelValue === color.hex }"
      :aria-label="`Выбрать цвет ${color.color}`"
      @click="$emit('update:modelValue', color.hex)"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  colors: { type: Array },
  modelValue: { type: String },
})

defineEmits(['update:modelValue'])
</script>
