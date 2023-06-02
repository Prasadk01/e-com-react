import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            console.log('API response:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
