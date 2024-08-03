import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
    }),
    getters: {
        cartTotal() {
            return this.cart.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        },
        numberOfProducts() {
            return this.cart.reduce((total, item) => {
                return total + item.quantity
            }, 0)
        }
    },
    actions: {
        async getCart() {
            const data = await $fetch('http://localhost:4000/cart')
            this.cart = data
            console.log(this.cart)
        },
        async addToCart(product) {
            const itemInCart = this.cart.find(item => item.id === product.id);
            let updatedProduct;

            if (itemInCart) {
                // If the item is already in the cart, increase the quantity
                this.cart = this.cart.map(p => {
                    if (p.id === product.id) {
                        p.quantity++;
                        updatedProduct = p;
                    }
                    return p;
                });

                try {
                    await $fetch(`http://localhost:4000/cart/${product.id}`, {
                        method: 'PUT',
                        body: updatedProduct,
                    });
                    console.log('Item quantity increased successfully');
                } catch (error) {
                    console.error('Failed to increase item quantity:', error);
                }
            } else {
                // If the item is not in the cart, add it with quantity 1
                const newProduct = { ...product, quantity: 1 };
                this.cart.push(newProduct);

                try {
                    await $fetch('http://localhost:4000/cart', {
                        method: 'POST',
                        body: newProduct,
                    });
                    console.log('Item added to cart successfully');
                } catch (error) {
                    console.error('Failed to add item to cart:', error);
                    // Optionally, remove the item from the cart if the POST request fails
                    this.cart = this.cart.filter(item => item.id !== product.id);
                }
            }
        },
        async deleteFromCart(id) {
            const itemExists = this.cart.find(item => item.id === id);
            if (!itemExists) {
                console.error(`Item with ID ${id} does not exist in the cart.`);
                return;
            }

            try {
                await $fetch(`http://localhost:4000/cart/${id}`, {
                    method: 'DELETE',
                });
                this.cart = this.cart.filter(item => item.id !== id);
                console.log('Item deleted successfully');
            } catch (error) {
                console.error('Failed to delete item:', error);
            }
        },
        async updateQuantity(product, increment = true) {
            let updatedProduct;

            this.cart = this.cart.map(p => {
                if (p.id === product.id) {
                    if (increment) {
                        p.quantity++;
                    } else if (p.quantity > 1) {
                        p.quantity--;
                    }
                    updatedProduct = p;
                }
                return p;
            });

            try {
                await $fetch(`http://localhost:4000/cart/${product.id}`, {
                    method: 'PUT',
                    body: updatedProduct,
                });
                console.log('Item quantity updated successfully');
            } catch (error) {
                console.error('Failed to update item quantity:', error);
                // Optionally, revert the local state change if necessary
            }
        },
        async incQuantity(product) {
            await this.updateQuantity(product, true);
        },
        async decQuantity(product) {
            await this.updateQuantity(product, false);
        }
    }
})
