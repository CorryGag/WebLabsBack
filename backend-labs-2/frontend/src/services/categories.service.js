export async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8000/node/categories');
        const data = await response.json();
        return data.data; // Assuming the products are in the `data` field
    } catch (error) {
        console.error('Error fetching:', error);
        return []; // Return an empty array if there's an error
    }
}
