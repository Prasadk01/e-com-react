import React, { useEffect, useState } from 'react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                {item.title} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${calculateTotalPrice()}</p>
                </div>
            )}
        </div>
    );
};

export default CartPage;
