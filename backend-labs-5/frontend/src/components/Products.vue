<template>
    <div>
        <h1>Test products page</h1>
        <!-- Category Filter -->
        <div class="filter-container">
            <label for="category-select" class="filter-label">Filter by Category:</label>
            <select
                    id="category-select"
                    v-model="selectedCategory"
                    @change="filterProducts"
                    class="filter-select"
            >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <!-- Product List -->
        <div class="product-container" v-if="filteredProducts.length">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                <img :src="product.image" alt="Product Image" class="product-image"/>
                <div class="product-info">
                    <h3 class="product-title">{{ product.name }}</h3>
                    <p class="product-description">{{ product.description }}</p>
                    <div class="product-footer">
                        <span class="product-price">{{ product.price }} USD</span>
                        <button @click="addToCart(product)" class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="loading">No products</div>
    </div>
</template>

<script>
import {fetchProducts} from '@/services/products.service.js';
import {fetchCategories} from '@/services/categories.service.js';

export default {
    data() {
        return {
            products: [],
            selectedCategory: '',
            filteredProducts: [],
            categories: ['Category 1', 'Category 2', 'Category 3'], // Example categories
        };
    },
    async created() {
        this.categories = await fetchCategories();
        this.products = await fetchProducts();
        this.filteredProducts = this.products; // Initially show all products
    },
    methods: {
        addToCart(product) {
            console.log(`${product.name} added to cart.`);
        },
        async filterProducts() {
            this.filteredProducts = await fetchProducts(this.selectedCategory);
        }
    }
};
</script>

<style scoped>
.product-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.product-card {
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 15px;
}

.product-title {
    font-size: 1.2em;
    font-weight: bold;
}

.product-description {
    font-size: 1em;
    color: #666;
}

.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

.product-price {
    font-size: 1.1em;
    font-weight: bold;
}

.add-to-cart-btn {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
    background-color: #0056b3;
}

.loading {
    font-size: 1.5em;
    color: #007bff;
    text-align: center;
    margin-top: 20px;
}

.filter-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.filter-label {
    font-size: 1.1em;
    margin-right: 10px;
}

.filter-select {
    padding: 8px;
    font-size: 1em;
    border-radius: 4px;
    border: 1px solid #ddd;
}
</style>
