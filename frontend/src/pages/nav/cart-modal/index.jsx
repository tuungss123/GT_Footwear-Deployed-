import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

const CartModal = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCartItems = () => {
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
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleDeleteItem = async (id) => {
        try {
             await axios.delete(`http://127.0.0.1:8000/gt/cart/remove/${id}`, {
                withCredentials: true
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handlePlusQuantity = async (id, quantity) => {
        try {
            const newQuantity = parseInt(quantity, 10) + 1;

            await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`, 
            {quantity: newQuantity}, {withCredentials: true}
        );
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    }

    const handleMinusQuantity = async (id, quantity) => {
        try {
            const newQuantity = parseInt(quantity, 10) - 1;

            if(newQuantity == 0){
                handleDeleteItem(id)
            }

            await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`, {
                quantity: newQuantity
            }, {
                withCredentials: true
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    }
    

    return (
        <div className="overflow-auto h-auto">
            <div className="mb-2">
                <p className="mb-2 font-bold text-lg">Your Cart</p>
                <hr></hr>
            </div>
            {cart.map(item => (
                <div key={item.id} className="flex flex-row">
                        <div className="w-[40%]">
                            <img className="w-[80%]" src={item.product.picture_url} alt={item.product.name} />
                        </div>
                        <div className="flex flex-col w-[60%]">
                            <p className="font-medium">{item.product.name}</p>
                            <p>Size: {item.size.size} {item.product.gender}</p>

                            <div className="flex flex-row">
                                <button
                                disabled={item.quantity == 0}
                                >
                                    <FontAwesomeIcon 
                                        icon={faMinus} 
                                        style={{ fontSize: '15px', color: 'black', cursor: 'pointer' }}
                                        onClick={() => {handleMinusQuantity(item.id, item.quantity)}}
                                        />
                                </button>
                                <p className="p-2 text-xl">{item.quantity}</p>
                                <button className="">
                                    <FontAwesomeIcon 
                                        icon={faPlus} 
                                        style={{ fontSize: '15px', color: 'black', cursor: 'pointer' }} 
                                        onClick={() => {handlePlusQuantity(item.id,item.quantity)}}
                                    />
                                </button>
                            </div>

                            <p>₱{item.product.price}</p>
                        </div>
                </div>
            ))}

            <div className="flex flex-row mt-5 justify-between items-center">
                <p className="font-medium text-md">Total Price:</p>
                <p className="font-medium text-xl"> ₱{totalPrice}</p>
            </div>
        </div>
    );
}

export default CartModal;
