<template>
  <div
    class="shop-filters bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm w-full md:w-80 md:min-w-80 md:max-w-80 flex flex-col"
  >
    <div class="flex items-center justify-between mb-6 flex-shrink-0">
      <h2 class="text-xl font-bold text-black">Фильтры</h2>
      <button
        @click="$emit('close-filters')"
        class="md:hidden text-gray-500 hover:text-black p-1 -m-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <hr class="border-gray-200 mb-6 flex-shrink-0" />

    <!-- Контейнер для скроллируемого контента -->
    <div class="flex-1 overflow-y-auto md:overflow-visible space-y-6">
      <!-- Фильтр по типу товара (Категории) -->
      <div class="filter-section">
        <div
          @click="toggleSection('categories')"
          class="flex items-center justify-between cursor-pointer mb-4"
        >
          <h3 class="text-lg font-semibold text-black">Тип товара</h3>
          <ChevronIcon :is-open="openSections.categories" />
        </div>
        <div v-show="openSections.categories" class="space-y-3">
          <label
            v-for="category in displayedCategories"
            :key="category.value"
            class="flex items-center justify-between text-sm text-gray-700 hover:text-black cursor-pointer group"
          >
            <div class="flex items-center flex-1">
              <span class="group-hover:text-black">{{ category.name }}</span>
            </div>
            <input
              type="checkbox"
              :value="category.value"
              v-model="tempFilters.categories"
              class="form-checkbox h-5 w-5 text-black border-2 border-gray-400 rounded focus:ring-black/50 focus:ring-offset-0"
            />
          </label>
          <button
            v-if="availableFilters.categories.length > initialCategoriesToShow"
            @click="showAllCategories = !showAllCategories"
            class="text-xs text-blue-600 hover:underline mt-2"
          >
            {{
              showAllCategories ? 'Скрыть' : `Показать все (${availableFilters.categories.length})`
            }}
          </button>
          <p
            v-if="!availableFilters.categories.length && !productStore.isLoading"
            class="text-xs text-gray-500"
          >
            Нет доступных категорий
          </p>
        </div>
      </div>

      <hr class="border-gray-200" />

      <!-- Фильтр по цене с ползунком и полями ввода -->
      <div class="filter-section">
        <div
          @click="toggleSection('price')"
          class="flex items-center justify-between cursor-pointer mb-4"
        >
          <h3 class="text-lg font-semibold text-black">Цена</h3>
          <ChevronIcon :is-open="openSections.price" />
        </div>
        <div v-show="openSections.price" class="space-y-4">
          <!-- Поля ввода цены -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <label class="block text-xs text-gray-600 mb-1">От</label>
              <div class="relative">
                <input
                  type="number"
                  :min="priceRangeSlider.min"
                  :max="priceRangeSlider.max"
                  :step="priceRangeSlider.step"
                  v-model.number="priceInputs.min"
                  @input="updatePriceFromInputs"
                  @blur="validatePriceInputs"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black pr-6"
                  placeholder="0"
                />
                <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >₽</span
                >
              </div>
            </div>
            <div class="text-gray-400 mt-5">—</div>
            <div class="flex-1">
              <label class="block text-xs text-gray-600 mb-1">До</label>
              <div class="relative">
                <input
                  type="number"
                  :min="priceRangeSlider.min"
                  :max="priceRangeSlider.max"
                  :step="priceRangeSlider.step"
                  v-model.number="priceInputs.max"
                  @input="updatePriceFromInputs"
                  @blur="validatePriceInputs"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black pr-6"
                  placeholder="10000"
                />
                <span class="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >₽</span
                >
              </div>
            </div>
          </div>

          <!-- Слайдер -->
          <div v-if="priceRangeSlider.max > priceRangeSlider.min" class="mt-4">
            <Slider
              v-model="priceRangeSlider.value"
              :min="priceRangeSlider.min"
              :max="priceRangeSlider.max"
              :step="priceRangeSlider.step"
              :tooltips="false"
              @update="updatePriceFiltersFromSlider"
              class="shop-price-slider"
            />
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>{{ priceFormat(priceRangeSlider.min) }}</span>
              <span>{{ priceFormat(priceRangeSlider.max) }}</span>
            </div>
          </div>
          <div v-else class="text-xs text-gray-500">Диапазон цен не определен.</div>
        </div>
      </div>

      <hr class="border-gray-200" />

      <!-- Фильтр по цветам -->
      <div class="filter-section">
        <div
          @click="toggleSection('colors')"
          class="flex items-center justify-between cursor-pointer mb-4"
        >
          <h3 class="text-lg font-semibold text-black">Цвета</h3>
          <ChevronIcon :is-open="openSections.colors" />
        </div>
        <div v-show="openSections.colors">
          <div class="grid grid-cols-6 gap-2.5">
            <button
              v-for="color in availableFilters.colors"
              :key="color.hex"
              @click="toggleArrayFilter(tempFilters.colors, color.hex)"
              class="w-full aspect-square rounded-full border border-gray-300/70 transition-all focus:outline-none flex items-center justify-center hover:scale-105"
              :style="{ backgroundColor: color.hex }"
              :aria-label="`Выбрать цвет ${color.name}`"
              :class="{
                'ring-2 ring-black ring-offset-1': tempFilters.colors.includes(color.hex),
              }"
            >
              <CheckIcon
                v-if="tempFilters.colors.includes(color.hex)"
                :is-light-bg="isLightColor(color.hex)"
                class="w-4 h-4"
              />
            </button>
          </div>
          <p
            v-if="!availableFilters.colors.length && !productStore.isLoading"
            class="text-xs text-gray-500 mt-3"
          >
            Нет доступных цветов
          </p>
        </div>
      </div>

      <hr class="border-gray-200" />

      <!-- Фильтр по размерам -->
      <div class="filter-section">
        <div
          @click="toggleSection('sizes')"
          class="flex items-center justify-between cursor-pointer mb-4"
        >
          <h3 class="text-lg font-semibold text-black">Размер</h3>
          <ChevronIcon :is-open="openSections.sizes" />
        </div>
        <div v-show="openSections.sizes">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in availableFilters.sizes"
              :key="size"
              @click="toggleArrayFilter(tempFilters.sizes, size)"
              class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors h-8 leading-none"
              :class="
                tempFilters.sizes.includes(size)
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              "
            >
              {{ size }}
            </button>
          </div>
          <p
            v-if="!availableFilters.sizes.length && !productStore.isLoading"
            class="text-xs text-gray-500 mt-3"
          >
            Нет доступных размеров
          </p>
        </div>
      </div>
    </div>

    <!-- Кнопки управления -->
    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3">
      <button
        @click="applyFiltersAndClose"
        class="w-full bg-black text-white font-medium py-3 rounded-full hover:bg-gray-800 transition-colors text-sm h-11"
      >
        Применить фильтр
      </button>
      <button
        v-if="hasActiveFilters"
        @click="resetAllFilters"
        class="w-full text-gray-700 font-medium py-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-300 text-sm h-11"
      >
        Сбросить все
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import Slider from '@vueform/slider'

// Компоненты иконок
const ChevronIcon = {
  props: ['isOpen'],
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 transition-transform duration-200" :class="{'rotate-180': !isOpen}"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>`,
}
const CheckIcon = {
  props: { isLightBg: { type: Boolean, default: false } },
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" :class="isLightBg ? 'text-black' : 'text-white'"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" /></svg>`,
}

const emit = defineEmits(['apply-filters', 'close-filters'])
const productStore = useProductStore()

const openSections = reactive({ categories: true, price: true, colors: true, sizes: true })
const selectedFilters = reactive({
  categories: [],
  priceRange: { min: null, max: null },
  colors: [],
  sizes: [],
})
const tempFilters = reactive({
  categories: [],
  priceRange: { min: null, max: null },
  colors: [],
  sizes: [],
})

const priceInputs = reactive({ min: null, max: null })
const showAllCategories = ref(false)
const initialCategoriesToShow = 5

// Настройки слайдера
const priceRangeSlider = reactive({
  min: 0,
  max: 10000,
  step: 100,
  value: [0, 10000],
})
const priceFormat = (value) => `${Math.round(value)} ₽`

// Доступные фильтры
const availableFilters = computed(() => {
  const products = productStore.allProducts
  const categories = new Set()
  const colors = new Set()
  const sizes = new Set()
  let minPrice = Infinity,
    maxPrice = 0

  products.forEach((p) => {
    categories.add(p.category || p.dress_style)
    if (p.price !== undefined) {
      minPrice = Math.min(minPrice, p.price)
      maxPrice = Math.max(maxPrice, p.price)
    }
    if (p.colors) p.colors.forEach((c) => colors.add(JSON.stringify(c)))
    if (p.availableSizes) p.availableSizes.forEach((s) => sizes.add(s))
  })

  const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']
  return {
    categories: [...categories]
      .map((c) => ({ name: c, value: c?.toLowerCase() }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    minPrice: minPrice === Infinity ? 0 : Math.floor(minPrice / 100) * 100,
    maxPrice: maxPrice === 0 ? 10000 : Math.ceil(maxPrice / 100) * 100,
    colors: [...colors]
      .map((c) => JSON.parse(c))
      .sort((a, b) => (a.name || '').localeCompare(b.name || '')),
    sizes: [...sizes].sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)),
  }
})

// Обновление слайдера
watch(
  () => [availableFilters.value.minPrice, availableFilters.value.maxPrice],
  ([newMin, newMax]) => {
    priceRangeSlider.min = newMin
    priceRangeSlider.max = newMax
    if (tempFilters.priceRange.min === null) {
      tempFilters.priceRange.min = newMin
      priceRangeSlider.value[0] = newMin
      priceInputs.min = newMin
    } else {
      priceRangeSlider.value[0] = tempFilters.priceRange.min
      priceInputs.min = tempFilters.priceRange.min
    }
    if (tempFilters.priceRange.max === null) {
      tempFilters.priceRange.max = newMax
      priceRangeSlider.value[1] = newMax
      priceInputs.max = newMax
    } else {
      priceRangeSlider.value[1] = tempFilters.priceRange.max
      priceInputs.max = tempFilters.priceRange.max
    }
  },
  { immediate: true },
)

const displayedCategories = computed(() =>
  showAllCategories.value
    ? availableFilters.value.categories
    : availableFilters.value.categories.slice(0, initialCategoriesToShow),
)

// Обновление цены из слайдера
const updatePriceFiltersFromSlider = (sliderValue) => {
  tempFilters.priceRange.min = Math.round(sliderValue[0])
  tempFilters.priceRange.max = Math.round(sliderValue[1])
  priceInputs.min = Math.round(sliderValue[0])
  priceInputs.max = Math.round(sliderValue[1])
}

// Обновление цены из полей
const updatePriceFromInputs = () => {
  const min = Number(priceInputs.min)
  const max = Number(priceInputs.max)
  if (!isNaN(min) && min >= priceRangeSlider.min && min <= priceRangeSlider.max) {
    tempFilters.priceRange.min = min
    priceRangeSlider.value[0] = min
  }
  if (!isNaN(max) && max >= priceRangeSlider.min && max <= priceRangeSlider.max) {
    tempFilters.priceRange.max = max
    priceRangeSlider.value[1] = max
  }
}

// Валидация полей ввода
const validatePriceInputs = () => {
  priceInputs.min = Math.max(
    priceRangeSlider.min,
    Math.min(priceRangeSlider.max, priceInputs.min || priceRangeSlider.min),
  )
  priceInputs.max = Math.max(
    priceRangeSlider.min,
    Math.min(priceRangeSlider.max, priceInputs.max || priceRangeSlider.max),
  )
  if (priceInputs.min > priceInputs.max)
    [priceInputs.min, priceInputs.max] = [priceInputs.max, priceInputs.min]
  updatePriceFromInputs()
}

const toggleSection = (section) => (openSections[section] = !openSections[section])

const toggleArrayFilter = (array, value) => {
  const index = array.indexOf(value)
  if (index > -1) array.splice(index, 1)
  else array.push(value)
}

const applyFiltersAndClose = () => {
  selectedFilters.categories = [...tempFilters.categories]
  selectedFilters.priceRange.min = tempFilters.priceRange.min
  selectedFilters.priceRange.max = tempFilters.priceRange.max
  selectedFilters.colors = [...tempFilters.colors]
  selectedFilters.sizes = [...tempFilters.sizes]
  emit('apply-filters', { ...selectedFilters })
  emit('close-filters')
}

const hasActiveFilters = computed(
  () =>
    tempFilters.categories.length ||
    tempFilters.colors.length ||
    tempFilters.sizes.length ||
    tempFilters.priceRange.min !== availableFilters.value.minPrice ||
    tempFilters.priceRange.max !== availableFilters.value.maxPrice,
)

const resetAllFilters = () => {
  tempFilters.categories = []
  tempFilters.priceRange.min = availableFilters.value.minPrice
  tempFilters.priceRange.max = availableFilters.value.maxPrice
  priceRangeSlider.value = [availableFilters.value.minPrice, availableFilters.value.maxPrice]
  priceInputs.min = availableFilters.value.minPrice
  priceInputs.max = availableFilters.value.maxPrice
  tempFilters.colors = []
  tempFilters.sizes = []
  selectedFilters.categories = []
  selectedFilters.priceRange.min = availableFilters.value.minPrice
  selectedFilters.priceRange.max = availableFilters.value.maxPrice
  selectedFilters.colors = []
  selectedFilters.sizes = []
  applyFiltersAndClose()
}

const isLightColor = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return (r * 299 + g * 587 + b * 114) / 1000 >= 150
}
</script>

<style>
/* Стили для @vueform/slider */
.shop-price-slider {
  --slider-connect-bg: #000000;
  --slider-tooltip-bg: #000000;
  --slider-handle-bg: #000000;
  --slider-handle-ring-color: rgba(0, 0, 0, 0.2);
  --slider-height: 6px;
  --slider-handle-width: 20px;
  --slider-handle-height: 20px;
  --slider-tooltip-py: 2px;
  --slider-tooltip-px: 6px;
  --slider-tooltip-font-size: 0.75rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.form-checkbox:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  background-color: black;
  border-color: black;
}

.form-checkbox {
  appearance: none;
  -webkit-appearance: none;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  background-color: #fff;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
