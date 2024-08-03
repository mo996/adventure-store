<template>
    <div class="flex items-center">
      <button class="btn text-white " @click="updateQuantity('decrease')">-</button>
  
      <p class="py-1 px-4 mx-1 rounded-sm text-lg text-retroBrown bg-gray-200">
        {{ product.quantity }}
      </p>
  
      <button class="btn text-white" @click="updateQuantity('increase')">+</button>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '#imports'
  
  const props = defineProps(['product'])
  const cartStore = useCartStore()
  
  const updateQuantity = async (action) => {
    try {
      if (action === 'increase') {
        await cartStore.incQuantity(props.product)
      } else if (action === 'decrease') {
        await cartStore.decQuantity(props.product)
      }
    } catch (err) {
      console.error(`Failed to ${action} quantity:`, err)
    }
  }
  </script>
  
  <style scoped>
  </style>
  