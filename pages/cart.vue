<template>
  <div>
    <h2 class="text-retroBrown text-2xl text-center my-8">Your Basket</h2>

    <div class="card text-xl" v-if="cartStore.cart.length">
      <!-- product list -->
      <div v-for="product in cartStore.cart" class="flex gap-8 items-center">
        <img :src="product.img" :alt="product.title">
        <p class="text-retroBrown">{{ product.title }}</p>
        <!-- product quantity -->
        <ProductQuantity :product="product" />
        <p class="text-retroBrown">{{ product.price * product.quantity }} coins</p>

        <!-- delete -->
        <button class="ml-auto " @click="cartStore.deleteFromCart(product.id)">
          <span class="material-icons-outlined hover:text-white text-retroBrown">delete</span>
        </button>
      </div>

      <!-- cart total -->
      <div class="text-right pt-4 mt-4 border-t-2">
        <span class="text-yellow-700">Total amount to pay: </span>
        <span class="text-secondary">{{ cartStore.cartTotal }} Coins</span>
      </div>
    </div>

    <div class="card text-xl" v-else>
      <p class="text-white">There are no items in your basket.</p>
    </div>

  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import ProductQuantity from '~/components/ProductQuantity.vue';

const cartStore = useCartStore()
</script>

<style scoped></style>