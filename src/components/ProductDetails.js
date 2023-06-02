import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
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

export default Home;
