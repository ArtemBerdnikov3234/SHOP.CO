<template>
  <section
    class="relative min-h-[72vh] bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${heroImageURL})` }"
  >
    <div class="container mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 min-h-[62vh] items-center">
        <div class="lg:col-span-7 xl:col-span-8 text-center lg:text-left">
          <h1 class="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl">
            НАЙДИТЕ ОДЕЖДУ,<br />СООТВЕТСТВУЮЩУЮ<br />ВАШЕМУ СТИЛЮ
          </h1>

          <p class="mt-6 text-base text-gray-600">
            Ознакомьтесь с нашим разнообразным ассортиментом тщательно подобранной<br />одежды,
            созданной для того, чтобы подчеркнуть вашу индивидуальность.
          </p>

          <router-link
            to="/shop"
            class="mt-10 rounded-full bg-black px-14 py-4 font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 inline-block"
          >
            Купить сейчас
          </router-link>

          <div
            class="mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start lg:gap-8"
          >
            <div class="stat">
              <div class="text-3xl font-bold text-black lg:text-4xl">200+</div>
              <div class="text-sm text-gray-600">Международных брендов</div>
            </div>
            <div class="hidden h-12 w-px bg-black/10 sm:block"></div>
            <div class="stat">
              <div class="text-3xl font-bold text-black lg:text-4xl">2,000+</div>
              <div class="text-sm text-gray-600">Премиальной одежды</div>
            </div>
            <div class="hidden h-12 w-px bg-black/10 sm:block"></div>
            <div class="stat">
              <div class="text-3xl font-bold text-black lg:text-4xl">30,000+</div>
              <div class="text-sm text-gray-600">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImageURL from '@/assets/images/hero-fashion-model.jpg'
</script>
