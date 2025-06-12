<template>
  <section class="pb-6 sm:pb-8">
    <div class="container mx-auto max-w-7xl px-4 md:px-6">
      <div class="bg-gray-100 p-6 sm:p-6 md:p-8 rounded-3xl shadow-xl">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 text-black">
          ПОСМОТРЕТЬ ПО СТИЛЮ ОДЕЖДЫ
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          <!-- Карточка 1: Повседневный -->
          <div
            class="sm:col-span-1 lg:col-span-2 aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-2"
          >
            <StyleCard v-if="styles[0]" :style-item="styles[0]" @select-style="handleStyleSelect" />
          </div>

          <!-- Карточка 2: Формальный -->
          <div
            class="sm:col-span-1 lg:col-span-3 aspect-w-16 aspect-h-9 md:aspect-w-5 md:aspect-h-2"
          >
            <StyleCard v-if="styles[1]" :style-item="styles[1]" @select-style="handleStyleSelect" />
          </div>

          <!-- Карточка 3: Вечеринка -->
          <div
            class="sm:col-span-1 lg:col-span-3 aspect-w-16 aspect-h-9 md:aspect-w-5 md:aspect-h-2"
          >
            <StyleCard v-if="styles[2]" :style-item="styles[2]" @select-style="handleStyleSelect" />
          </div>

          <!-- Карточка 4: Спорт -->
          <div
            class="sm:col-span-1 lg:col-span-2 aspect-w-4 aspect-h-3 md:aspect-w-3 md:aspect-h-2"
          >
            <StyleCard v-if="styles[3]" :style-item="styles[3]" @select-style="handleStyleSelect" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import StyleCard from './StyleCard.vue'

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

<style scoped>
/* CSS Fallback для @tailwindcss/aspect-ratio */
.aspect-w-1::before {
  --tw-aspect-w: 1;
}
.aspect-h-1::before {
  --tw-aspect-h: 1;
}

.aspect-w-3::before {
  --tw-aspect-w: 3;
}
.aspect-h-2::before {
  --tw-aspect-h: 2;
}
.aspect-h-4::before {
  --tw-aspect-h: 4;
}

.aspect-w-4::before {
  --tw-aspect-w: 4;
}
.aspect-h-3::before {
  --tw-aspect-h: 3;
}

.aspect-w-5::before {
  --tw-aspect-w: 5;
}

.aspect-w-16::before {
  --tw-aspect-w: 16;
}
.aspect-h-9::before {
  --tw-aspect-h: 9;
}

[class*='aspect-w-'] {
  position: relative;
}

[class*='aspect-w-']::before {
  content: '';
  display: block;
  padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
}

[class*='aspect-w-'] > :deep(*) {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
