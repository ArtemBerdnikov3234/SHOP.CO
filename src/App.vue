<template>
  <div id="app-root" class="flex flex-col min-h-screen bg-white">
    <AppHeader />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/main/AppHeader.vue'
import AppFooter from './components/main/AppFooter.vue'
</script>

<style>
#app-root {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
