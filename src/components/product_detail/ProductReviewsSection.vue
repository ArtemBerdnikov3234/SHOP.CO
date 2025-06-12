<template>
  <!-- Основной контейнер, отображается при наличии отзывов -->
  <div v-if="reviews && reviews.length > 0" class="mt-12 pt-8 border-t border-gray-200">
    <div class="flex justify-between items-center mb-6">
      <!-- Заголовок "Все отзывы" и их общее количество -->
      <div class="flex items-baseline">
        <h2 class="text-black font-bold text-2xl leading-normal">Все отзывы</h2>
        <span class="text-black/60 font-normal text-base ml-2"> ({{ reviews.length }}) </span>
      </div>
      <div class="flex gap-[10px] items-center">
        <!-- Выпадающий список для сортировки отзывов -->
        <div class="relative">
          <button
            @click="toggleSortDropdown"
            class="flex items-center bg-gray-100 rounded-full h-12 px-5 py-4 gap-3 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <span class="text-black font-medium text-base">{{ currentSortOption.label }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="{ 'rotate-180': sortDropdownOpen }"
              class="w-4 h-4 transition-transform"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            v-if="sortDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1"
          >
            <a
              v-for="option in sortOptions"
              :key="option.value"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click.prevent="changeSort(option)"
            >
              {{ option.label }}
            </a>
          </div>
        </div>

        <!-- Кнопка "Написать отзыв" -->
        <button
          class="flex items-center justify-center bg-black text-white rounded-full h-12 px-5 py-4 w-auto sm:w-[166px] hover:bg-gray-800 transition-colors"
        >
          <span class="text-white font-medium text-base">Написать отзыв</span>
        </button>
      </div>
    </div>

    <!-- Список отзывов -->
    <div class="space-y-4">
      <ProductReviewItem
        v-for="(review, index) in paginatedReviews"
        :key="review.date + '-' + index"
        :review="review"
      />
    </div>

    <!-- Кнопка "Загрузить еще отзывы", отображается, если есть не показанные отзывы -->
    <div v-if="hasMoreReviews" class="mt-8 text-center">
      <button
        @click="loadMoreReviews"
        class="flex items-center justify-center mx-auto border border-black/10 rounded-full h-[52px] w-auto px-10 sm:px-14 py-4 hover:bg-gray-50 transition-colors"
      >
        <span class="text-black font-medium text-base">Загрузить еще отзывы</span>
      </button>
    </div>
  </div>
  <!-- Отображается, если отзывов нет -->
  <div v-else class="mt-12 pt-8 border-t border-gray-200">
    <p class="text-center text-black/60">Отзывов пока нет. Будьте первым!</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductReviewItem from './ProductReviewItem.vue'

// Входные параметры: массив всех отзывов о товаре
const props = defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
})

// Реактивные переменные для управления сортировкой, пагинацией и состоянием UI
const sortOptions = ref([
  { label: 'Последние', value: 'date_desc' },
  { label: 'Сначала старые', value: 'date_asc' },
  { label: 'Высокий рейтинг', value: 'rating_desc' },
  { label: 'Низкий рейтинг', value: 'rating_asc' },
])
const currentSortOption = ref(sortOptions.value[0])
const sortDropdownOpen = ref(false)
const reviewsPerPage = ref(3) // Количество отзывов на "странице"
const displayedReviewsCount = ref(reviewsPerPage.value)

// Вычисляемое свойство, которое сортирует отзывы в соответствии с выбранной опцией
const sortedReviews = computed(() => {
  const reviewsCopy = [...props.reviews]
  switch (currentSortOption.value.value) {
    case 'date_asc':
      return reviewsCopy.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'rating_desc':
      return reviewsCopy.sort((a, b) => b.rating - a.rating)
    case 'rating_asc':
      return reviewsCopy.sort((a, b) => a.rating - b.rating)
    case 'date_desc':
    default:
      return reviewsCopy.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})

// Вычисляемое свойство для отображения текущей "страницы" отзывов
const paginatedReviews = computed(() => {
  return sortedReviews.value.slice(0, displayedReviewsCount.value)
})

// Вычисляемое свойство, определяющее, есть ли еще отзывы для загрузки
const hasMoreReviews = computed(() => {
  return displayedReviewsCount.value < sortedReviews.value.length
})

// Функции-обработчики для UI
const toggleSortDropdown = () => {
  sortDropdownOpen.value = !sortDropdownOpen.value
}

const changeSort = (option) => {
  currentSortOption.value = option
  sortDropdownOpen.value = false
  // Сбрасываем пагинацию при смене сортировки
  displayedReviewsCount.value = reviewsPerPage.value
}

const loadMoreReviews = () => {
  displayedReviewsCount.value += reviewsPerPage.value
  if (displayedReviewsCount.value > sortedReviews.value.length) {
    displayedReviewsCount.value = sortedReviews.value.length
  }
}
</script>
