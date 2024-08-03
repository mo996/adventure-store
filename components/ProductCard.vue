<template>
  <div class="card flex flex-col sm:flex-row items-center gap-8 p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <img :src="product.img" :alt="`${product.title} image`" class="w-full sm:w-48 h-auto rounded-md object-cover">
    <div class="text-center sm:text-left">
      <p class="text-2xl text-retroBrown font-semibold">{{ product.title }}</p>
      <p class="text-lg text-gray-700 mt-2">{{ product.description }}</p>
      <p class="text-lg text-secondary my-3">{{ product.price }} Silver Coins</p>

      <button
        class="btn text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        @click="addToBasket"
        :disabled="isPending"
      >
        <span v-if="!isPending">Add to Basket</span>
        <span v-else>Adding...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const { product } = defineProps(['product'])

const cartStore = useCartStore()
const isPending = ref(false)

const addToBasket = async () => {
  try {
    isPending.value = true
    await cartStore.addToCart(product)
  } catch (error) {
    console.error('Failed to add to basket:', error)
  } finally {
    setTimeout(() => {
      isPending.value = false
    }, 1000)
  }
}
</script>
