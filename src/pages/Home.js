import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId) => {
        const productToAdd = products.find((product) => product.id === productId);
        const existingItemIndex = cart.findIndex((item) => item.id === productId);
        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            setCart((prevCart) => [...prevCart, { ...productToAdd, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="home">
            <div className="cart">
                <h2>Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                {item.title} - Quantity: {item.quantity}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h1 className="title">Home Page</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} className="product-image" />
                        <div className="product-details">
                            <h3>{product.title}</h3>
                            <p>Price: ${product.price}</p>
                            <p>{product.description}</p>
                            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
