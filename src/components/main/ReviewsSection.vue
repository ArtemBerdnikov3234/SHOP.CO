<template>
  <section class="py-12 sm:py-16 bg-white">
    <div class="container mx-auto max-w-7xl">
      <h2
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-14 px-4 text-black"
      >
        ОТЗЫВЫ НАШИХ КЛИЕНТОВ
      </h2>
      <div class="relative px-10 sm:px-12 md:px-16">
        <!-- Контейнер для отзывов с горизонтальной прокруткой -->
        <div
          ref="reviewsContainer"
          class="flex overflow-x-auto pb-6 space-x-4 sm:space-x-6 snap-x snap-mandatory scrollbar-hide px-2"
          @scroll="updateScrollState"
        >
          <!-- Невидимый элемент для отступа слева -->
          <div class="shrink-0 w-2"></div>

          <ReviewCard
            v-for="(review, index) in reviews"
            :key="review.id || index"
            :review="review"
            class="snap-center sm:snap-start shrink-0"
          />

          <!-- Невидимый элемент для отступа справа -->
          <div class="shrink-0 w-2"></div>
        </div>

        <!-- Кнопка "Назад" -->
        <button
          v-if="showNavButtons"
          @click="scrollPrev"
          :disabled="!canScrollLeft"
          class="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          :class="canScrollLeft ? 'opacity-100' : 'opacity-30 cursor-not-allowed'"
          aria-label="Предыдущий отзыв"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <!-- Кнопка "Вперед" -->
        <button
          v-if="showNavButtons"
          @click="scrollNext"
          :disabled="!canScrollRight"
          class="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          :class="canScrollRight ? 'opacity-100' : 'opacity-30 cursor-not-allowed'"
          aria-label="Следующий отзыв"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue'
import ReviewCard from './ReviewCard.vue'

const props = defineProps({
  reviews: {
    type: Array,
    required: true,
  },
})

const reviewsContainer = ref(null)
const scrollLeft = ref(0)
const scrollWidth = ref(0)
const clientWidth = ref(0)

// Обновление состояния прокрутки
const updateScrollState = () => {
  if (!reviewsContainer.value) return

  const container = reviewsContainer.value
  scrollLeft.value = container.scrollLeft
  scrollWidth.value = container.scrollWidth
  clientWidth.value = container.clientWidth
}

// Вычисляемые свойства для определения возможности прокрутки
const hasOverflow = computed(() => scrollWidth.value > clientWidth.value)
const canScrollLeft = computed(() => scrollLeft.value > 0)
const canScrollRight = computed(() => scrollLeft.value < scrollWidth.value - clientWidth.value - 1)
const showNavButtons = computed(() => props.reviews.length > 0 && hasOverflow.value)

// Функции прокрутки
const scrollPrev = () => {
  if (!reviewsContainer.value || !canScrollLeft.value) return

  // Прокручиваем на ширину одной карточки + отступ
  const scrollAmount = getScrollAmount()
  reviewsContainer.value.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth',
  })
}

const scrollNext = () => {
  if (!reviewsContainer.value || !canScrollRight.value) return

  const scrollAmount = getScrollAmount()
  reviewsContainer.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth',
  })
}

// Вычисление размера прокрутки на основе первой карточки
const getScrollAmount = () => {
  const firstCard = reviewsContainer.value?.querySelector('.snap-center')
  if (firstCard) {
    const cardWidth = firstCard.offsetWidth
    const gap = 24
    return cardWidth + gap
  }
}

onMounted(() => {
  nextTick(updateScrollState)
  window.addEventListener('resize', updateScrollState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollState)
})

// Отслеживание изменений в массиве отзывов
watch(
  () => props.reviews,
  () => {
    nextTick(updateScrollState)
  },
  { deep: true },
)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
