<template>
  <div class="w-full flex flex-col h-full">
    <!-- Название и рейтинг -->
    <h1 v-if="product" class="text-black font-bold text-3xl lg:text-4xl leading-tight mb-2">
      {{ product.name }}
    </h1>
    <div v-if="product" class="flex items-center gap-3 mb-4">
      <div class="flex">
        <svg
          v-for="i in 5"
          :key="`star-${i}`"
          class="w-5 h-5 sm:w-6 sm:h-6"
          :class="i <= Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      </div>
      <p class="text-base font-normal">
        <span class="text-black">{{ product.rating?.toFixed(1) || '0.0' }}/</span>
        <span class="text-black/60">5.0</span>
      </p>
    </div>

    <!-- Цена -->
    <div v-if="product" class="flex items-center gap-3 mb-5">
      <span class="text-black font-bold text-2xl lg:text-[32px] leading-normal">
        ₽{{ product.price }}
      </span>
      <span
        v-if="product.discount?.is_active"
        class="text-black/30 font-bold text-2xl lg:text-[32px] leading-normal line-through"
      >
        ₽{{ product.discount.original_price }}
      </span>
      <div
        v-if="product.discount?.is_active"
        class="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
      >
        <span class="text-white font-semibold text-xs lg:text-sm">
          -{{ product.discount.discount_percentage }}%
        </span>
      </div>
    </div>

    <!-- Описание -->
    <p
      v-if="product && product.description"
      class="text-black/60 font-normal text-base leading-[22px] mb-6"
    >
      {{ product.description }}
    </p>

    <!-- Разделитель -->
    <div
      v-if="
        product &&
        (product.description || product.colors?.length > 0 || product.availableSizes?.length > 0)
      "
      class="w-full h-px bg-gray-200 mb-6"
    ></div>

    <!-- Выбор цвета -->
    <div v-if="product && product.colors && product.colors.length > 0" class="mb-6">
      <p class="text-black/60 font-normal text-base mb-3">Выберите цвет</p>
      <ColorSelector :colors="product.colors || []" v-model="selectedColor" />
    </div>

    <!-- Выбор размера -->
    <div v-if="product && product.availableSizes && product.availableSizes.length > 0" class="mb-6">
      <p class="text-black/60 font-normal text-base mb-3">Выберите размер</p>
      <SizeSelector :sizes="product.availableSizes || []" v-model="selectedSize" />
    </div>

    <!-- Кнопка внизу -->
    <div v-if="product" class="mt-auto">
      <button
        class="flex items-center justify-center bg-black text-white rounded-full h-[52px] w-full px-8 py-4 font-medium text-base hover:bg-gray-800 transition-colors"
        @click="handleAddToCart"
        :disabled="isAddingToCart"
      >
        {{ isAddingToCart ? 'Добавляем...' : 'Добавить в корзину' }}
      </button>
    </div>

    <div v-if="!product" class="text-center py-10 text-gray-500">
      Загрузка информации о товаре...
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import ColorSelector from './ColorSelector.vue'
import SizeSelector from './SizeSelector.vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  product: { type: Object, default: null },
})

const cartStore = useCartStore()

const selectedColor = ref('')
const selectedSize = ref('')
const isAddingToCart = ref(false)

const currentSelectedColorObject = computed(() => {
  if (!props.product || !props.product.colors || !selectedColor.value) {
    return null
  }
  return props.product.colors.find((c) => c.hex === selectedColor.value)
})

watch(
  () => props.product,
  (newProduct) => {
    console.log('ProductInfo: product prop changed:', newProduct)
    if (newProduct) {
      selectedColor.value = newProduct.colors?.[0]?.hex || ''
      selectedSize.value = newProduct.availableSizes?.[0] || ''
    } else {
      selectedColor.value = ''
      selectedSize.value = ''
    }
  },
  { immediate: true, deep: true },
)

const handleAddToCart = async () => {
  console.log('ProductInfo: handleAddToCart CALLED')
  if (!props.product) {
    console.error('ProductInfo: Cannot add to cart, props.product is null.')
    alert('Информация о товаре еще не загружена.')
    return
  }

  if (props.product.colors && props.product.colors.length > 0 && !selectedColor.value) {
    alert('Пожалуйста, выберите цвет.')
    return
  }
  if (
    props.product.availableSizes &&
    props.product.availableSizes.length > 0 &&
    !selectedSize.value
  ) {
    alert('Пожалуйста, выберите размер.')
    return
  }

  isAddingToCart.value = true

  let itemImageUrl = props.product.imageUrl
  const colorObject = currentSelectedColorObject.value
  if (colorObject && colorObject.image) {
    itemImageUrl = colorObject.image
  }

  const itemToAdd = {
    productId: props.product.id,
    name: props.product.name,
    price: props.product.price,
    imageUrl: itemImageUrl,
    color: colorObject ? colorObject.color : 'N/A',
    colorHex: selectedColor.value,
    size: selectedSize.value,
    quantity: 1,
  }

  console.log('ProductInfo: Item to add:', itemToAdd)

  try {
    await cartStore.addItemToCart(itemToAdd)
    alert(
      `Товар "${props.product.name}" (${itemToAdd.color || selectedColor.value}, ${itemToAdd.size}) добавлен в корзину!`,
    )
  } catch (error) {
    console.error('ProductInfo: Error adding item to cart:', error)
    alert('Произошла ошибка при добавлении товара в корзину. Попробуйте еще раз.')
  } finally {
    isAddingToCart.value = false
  }
}
</script>
