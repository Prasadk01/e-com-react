import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com/products', // Replace with your API endpoint
});

export const fetchProducts = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

export default api;
