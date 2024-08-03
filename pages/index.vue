<template>
  <div>
    <h2 class="text-retroBrown text-2xl text-center my-8">Products</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <div v-if="loading" class="text-center text-retroYellow">Loading...</div>
      <div v-if="error" class="text-center text-red-500">Failed to load products: {{ error }}</div>
      <div v-else v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const products = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:4000/products')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    products.value = data || []
  } catch (err) {
    console.error('Fetch Error:', err)
    error.value = err.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>
