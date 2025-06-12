<template>
  <div class="flex gap-4">
    <button
      v-for="color in colors"
      :key="color.hex"
      class="w-[37px] h-[37px] rounded-full cursor-pointer relative transition-all border-[2px] border-gray-300/70"
      :style="{ backgroundColor: color.hex }"
      :class="{ 'ring-2 ring-black ring-offset-2': modelValue === color.hex }"
      @click="selectColor(color.hex)"
      :aria-label="`Выбрать цвет ${color.color}`"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  colors: { type: Array, required: true },
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])
const selectColor = (colorHex) => emit('update:modelValue', colorHex)
</script>
