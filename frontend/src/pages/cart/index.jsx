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
        <div className="flex flex-col">
            {cart.map(item => (
                <div key={item.id}>
                    <p>Name: {item.product.name}</p>
                    <p>Size: {item.size.size}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.product.price}</p>
                    <img className="w-20" src={item.product.picture_url}/>
                </div>
            ))}
        </div>
    );
}

export default Cart;
