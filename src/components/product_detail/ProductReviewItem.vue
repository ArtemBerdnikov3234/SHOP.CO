<template>
  <div class="py-6 border-b border-gray-200 last:border-b-0">
    <div class="flex items-center mb-2">
      <span class="font-semibold text-black text-lg">{{ review.user }}</span>

      <div class="flex ml-3">
        <span
          class="text-yellow-400"
          v-for="i in Math.floor(review.rating || 0)"
          :key="`filled-${i}`"
          >★</span
        >
        <span
          class="text-gray-300"
          v-for="i in 5 - Math.floor(review.rating || 0)"
          :key="`empty-${i}`"
          >★</span
        >
      </div>

      <span class="text-sm text-black/60 ml-auto">{{ formattedDate }}</span>
    </div>

    <p class="text-black/80 text-base leading-relaxed">{{ review.comment }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  review: {
    type: Object,
    required: true,
    default: () => ({ user: '', rating: 0, comment: '', date: '' }),
  },
})

const formattedDate = computed(() => {
  if (!props.review.date) return ''
  return new Date(props.review.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})
</script>
