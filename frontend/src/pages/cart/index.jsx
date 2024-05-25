import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/gt/cart/items/', { withCredentials: true })
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error('Error fetching Cart Items:', error);
            });
    }, []);

    return (
        <div>
            {cart.map(item => (
                <div key={item.id}>
                    <p>Name: {item.product.name}</p>
                    <p>Size: {item.size.size}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
}

export default Cart;
