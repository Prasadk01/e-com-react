import React, { useState, useEffect } from 'react';
import './ShoppingCart.css';

const ShoppingCart = () => {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Retrieve items from localStorage
        const storedItems = JSON.parse(localStorage.getItem('cart'));
        if (storedItems) {
            setItems(storedItems);
            calculateTotalPrice(storedItems);
        }
    }, []);

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(totalPrice);
    };

    const addItemToCart = (product) => {
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
            const updatedItems = items.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setItems(updatedItems);
            calculateTotalPrice(updatedItems); // Update total price
            localStorage.setItem('cart', JSON.stringify(updatedItems));
        } else {
            const updatedItems = [...items, { ...product, quantity: 1 }];
            setItems(updatedItems);
            calculateTotalPrice(updatedItems); // Update total price
            localStorage.setItem('cart', JSON.stringify(updatedItems));
        }
    };


    const removeItemFromCart = (product) => {
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
            if (existingItem.quantity === 1) {
                const updatedItems = items.filter((item) => item.id !== product.id);
                setItems(updatedItems);
                calculateTotalPrice(updatedItems);
                localStorage.setItem('cart', JSON.stringify(updatedItems));
            } else {
                const updatedItems = items.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
                setItems(updatedItems);
                calculateTotalPrice(updatedItems);
                localStorage.setItem('cart', JSON.stringify(updatedItems));
            }
        }
    };

    return (
        <div className="shopping-cart">
            <h2>Shopping Cart</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <img src={item.thumbnail} alt={item.title} />
                        <div className="cart-item-details">
                            <div className="cart-item-title">{item.title}</div>
                            <div className="cart-item-price">RS.{item.price}</div>
                            <div className="cart-item-quantity">
                                <button className="quantity-btn" onClick={() => addItemToCart(item)}>+</button>
                                <span>{item.quantity}</span>
                                <button className="quantity-btn" onClick={() => removeItemFromCart(item)}>-</button>
                            </div>
                        </div>
                    </li>
                ))}
                <h1 className="total-price">
                    Total Price: <span className="total-price-label">RS.{totalPrice}</span>
                </h1>
            </ul>
        </div>
    );
};

export default ShoppingCart;
