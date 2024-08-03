<template>
  <div class="m-8">
    <AppHeader />
    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import AppHeader from '@/components/AppHeader.vue'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.getCart()
})
</script>

<style scoped>
.badge {
  position: relative;
  left: -15px;
}
</style>
