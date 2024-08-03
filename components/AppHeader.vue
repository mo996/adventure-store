<template>
  <header class="wrapper flex justify-between items-center bg-retroBrown text-retroYellow p-4 shadow-md sticky top-0 z-50">
    <NuxtLink to="/" class="hover:opacity-80 transition-opacity">
      <h1 class="text-2xl sm:text-5xl font-bold tracking-wide">Adventure Store</h1>
    </NuxtLink>
    <NuxtLink to="/cart" aria-label="Shopping Cart" class="relative">
      <span class="material-icons-outlined text-white text-3xl sm:text-5xl hover:scale-105 transition-transform">
        shopping_bag
      </span>
      <span class="bg-secondary text-white py-1 px-2 rounded-2xl font-bold badge absolute top-0 right-0 transform translate-x-2 -translate-y-2">
        {{ cartStore.numberOfProducts }}
      </span>
    </NuxtLink>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
.badge {
  font-size: 0.75rem;
  @apply text-sm sm:text-base;
}
</style>
