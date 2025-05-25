export async function fetchProducts(categoryId) {
    try {
        const query = categoryId ? '?filter.category_id=' + categoryId : '';
        const response = await fetch('http://localhost:8000/node/products' + query);
        const data = await response.json();
        return data.data; // Assuming the products are in the `data` field
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // Return an empty array if there's an error
    }
}
