
import { useEffect, useState } from "react";
import axios from "axios";

const CartModal = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/gt/cart/items/', { withCredentials: true })
            .then(response => {
                setCart(response.data);
                const totalPrice = response.data.reduce((total, item) => {
                    return total + (parseFloat(item.product.price) * item.quantity);
                }, 0);
                setTotalPrice(totalPrice);
            })
            .catch(error => {
                console.error('Error fetching Cart Items:', error);
            });
    }, []);

    return (
        <div className="overflow-auto h-[500px] text-center">
            {cart.map(item => (
                <div key={item.id} className="flex flex-col items-center">
                    <img className="w-20" src={item.product.picture_url} alt={item.product.name} />
                    <p>Name: {item.product.name}</p>
                    <p>Size: {item.size.size}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.product.price}</p>
                </div>
            ))}

            <div className="mt-5">
                <p className="font-bold text-xl">Total Price: {totalPrice}</p>
            </div>
        </div>
    );
}

export default CartModal;
