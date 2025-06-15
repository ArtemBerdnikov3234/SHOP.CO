<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="size in sizes"
      :key="size"
      class="px-6 py-3 rounded-full text-base font-medium transition-colors cursor-pointer"
      :class="
        modelValue === size ? 'bg-black text-white' : 'bg-gray-100 text-black/60 hover:bg-gray-200'
      "
      @click="$emit('update:modelValue', size)"
    >
      {{ size }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  sizes: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

defineEmits(['update:modelValue'])
</script>
