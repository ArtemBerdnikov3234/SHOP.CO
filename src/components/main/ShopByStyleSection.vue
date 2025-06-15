<template>
  <section class="py-6 container mx-auto max-w-7xl px-4">
    <div class="bg-gray-100 p-6 rounded-3xl shadow-xl">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8 text-black">
        ПОСМОТРЕТЬ ПО СТИЛЮ ОДЕЖДЫ
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="style in styles"
          :key="style.id"
          :class="[style.id === 1 || style.id === 4 ? 'lg:col-span-2' : 'lg:col-span-3', 'h-64']"
        >
          <div
            class="relative rounded-2xl overflow-hidden cursor-pointer group h-full bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            @click="handleStyleSelect(style.name)"
          >
            <img
              :src="style.imageUrl"
              :alt="style.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <h3 class="absolute top-4 left-4 text-xl md:text-2xl font-bold text-black">
              {{ style.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import casualImg from '@/assets/styles/casual.png'
import formalImg from '@/assets/styles/formal.png'
import partyImg from '@/assets/styles/party.png'
import sportImg from '@/assets/styles/sport.png'

const styles = ref([
  { id: 1, name: 'Повседневный', imageUrl: casualImg },
  { id: 2, name: 'Формальный', imageUrl: formalImg },
  { id: 3, name: 'Вечеринка', imageUrl: partyImg },
  { id: 4, name: 'Спорт', imageUrl: sportImg },
])

const handleStyleSelect = (styleName) => {
  console.log(`Выбран стиль: ${styleName}`)
}
</script>
