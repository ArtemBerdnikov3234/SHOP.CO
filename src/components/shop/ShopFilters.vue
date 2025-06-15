<template>
  <div
    class="shop-filters bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm w-full md:w-80 flex flex-col"
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

    <div class="flex-1 overflow-y-auto md:overflow-visible space-y-6">
      <div class="filter-section">
        <h3 class="text-lg font-semibold text-black mb-4">Категории</h3>
        <div class="space-y-3">
          <label
            v-for="category in displayedCategories"
            :key="category"
            class="flex items-center justify-between text-sm text-gray-700 hover:text-black cursor-pointer group"
          >
            <span class="group-hover:text-black">{{ category }}</span>
            <input
              type="checkbox"
              :value="category"
              v-model="activeFilters.categories"
              class="form-checkbox h-5 w-5 text-black border-2 border-gray-400 rounded focus:ring-black/50 focus:ring-offset-0"
            />
          </label>
          <button
            v-if="availableCategories.length > 5"
            @click="showAllCategories = !showAllCategories"
            class="text-xs text-blue-600 hover:underline mt-2"
          >
            {{ showAllCategories ? 'Скрыть' : `Показать все (${availableCategories.length})` }}
          </button>
        </div>
      </div>

      <hr class="border-gray-200" />

      <div class="filter-section">
        <h3 class="text-lg font-semibold text-black mb-4">Цена</h3>
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <label class="block text-xs text-gray-600 mb-1">От</label>
            <input
              type="number"
              :placeholder="minPrice?.toString()"
              v-model.number="activeFilters.priceRange.min"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          </div>
          <div class="text-gray-400 mt-5">—</div>
          <div class="flex-1">
            <label class="block text-xs text-gray-600 mb-1">До</label>
            <input
              type="number"
              :placeholder="maxPrice?.toString()"
              v-model.number="activeFilters.priceRange.max"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          </div>
        </div>
      </div>

      <hr class="border-gray-200" />

      <div class="filter-section">
        <h3 class="text-lg font-semibold text-black mb-4">Цвета</h3>
        <div class="grid grid-cols-6 gap-2.5">
          <button
            v-for="color in availableColors"
            :key="color.hex"
            @click="toggleColor(color.hex)"
            :style="{ backgroundColor: color.hex }"
            class="w-full aspect-square rounded-full border border-gray-300/70 transition-all focus:outline-none hover:scale-105"
            :class="{ 'ring-2 ring-black ring-offset-1': activeFilters.colors.includes(color.hex) }"
          ></button>
        </div>
      </div>

      <hr class="border-gray-200" />

      <div class="filter-section">
        <h3 class="text-lg font-semibold text-black mb-4">Размер</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in availableSizes"
            :key="size"
            @click="toggleSize(size)"
            class="px-3 py-1.5 rounded-full text-xs font-medium transition-colors h-8 leading-none"
            :class="
              activeFilters.sizes.includes(size)
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            "
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-gray-200 flex flex-col gap-3 flex-shrink-0">
      <button
        @click="applyFilters"
        class="w-full bg-black text-white font-medium py-3 rounded-full hover:bg-gray-800 transition-colors text-sm h-11"
      >
        Применить
      </button>
      <button
        v-if="hasActiveFilters"
        @click="resetFilters"
        class="w-full text-gray-700 font-medium py-3 rounded-full hover:bg-gray-100 transition-colors border border-gray-300 text-sm h-11"
      >
        Сбросить все
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useProductStore } from '@/stores/productStore'

const emit = defineEmits(['apply-filters', 'close-filters'])
const productStore = useProductStore()

const activeFilters = reactive({
  categories: [],
  priceRange: { min: null, max: null },
  colors: [],
  sizes: [],
})

const showAllCategories = ref(false)

const availableCategories = computed(() => {
  return Array.from(new Set(productStore.allProducts.map((product) => product.category))).sort()
})

const displayedCategories = computed(() =>
  showAllCategories.value ? availableCategories.value : availableCategories.value.slice(0, 5),
)

const allPrices = computed(() => {
  if (productStore.allProducts.length === 0) return [0]
  return productStore.allProducts.map((p) => p.price)
})

const minPrice = computed(() => Math.min(...allPrices.value))
const maxPrice = computed(() => Math.max(...allPrices.value))

const availableColors = computed(() => {
  const allColors = productStore.allProducts.flatMap((p) => p.colors)
  const uniqueColorsMap = new Map(allColors.map((color) => [color.hex, color]))
  return Array.from(uniqueColorsMap.values())
})

const availableSizes = computed(() => {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const allSizes = productStore.allProducts.flatMap((p) => p.sizes.map((s) => s.size))
  return Array.from(new Set(allSizes)).sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
})

const hasActiveFilters = computed(() => {
  return (
    activeFilters.categories.length > 0 ||
    activeFilters.colors.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.priceRange.min != null ||
    activeFilters.priceRange.max != null
  )
})

const toggleItemInArray = (array, item) => {
  const index = array.indexOf(item)
  if (index > -1) {
    array.splice(index, 1)
  } else {
    array.push(item)
  }
}

const toggleColor = (hex) => toggleItemInArray(activeFilters.colors, hex)
const toggleSize = (size) => toggleItemInArray(activeFilters.sizes, size)

const applyFilters = () => {
  emit('apply-filters', { ...activeFilters })
}

const resetFilters = () => {
  activeFilters.categories = []
  activeFilters.priceRange.min = null
  activeFilters.priceRange.max = null
  activeFilters.colors = []
  activeFilters.sizes = []
  applyFilters()
}
</script>
