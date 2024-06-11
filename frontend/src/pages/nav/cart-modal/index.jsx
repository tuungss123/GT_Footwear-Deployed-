import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

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

    const handleClearCart = async () => {
        try {
             await axios.delete(`http://127.0.0.1:8000/gt/cart/clear/`, {
                withCredentials: true
            });
            fetchCartItems();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

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

    const handleMinusQuantity = async (id, quantity) => {
        try {
            const newQuantity = parseInt(quantity, 10) - 1;

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
        <div className="overflow-auto h-[500px] text-center">
            <div>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                 onClick={handleClearCart}>Clear Cart</button>
            </div>
            {cart.map(item => (
                <div key={item.id} className="flex flex-col items-center">
                    <img className="w-20" src={item.product.picture_url} alt={item.product.name} />
                    <p>Name: {item.product.name}</p>
                    <p>Size: {item.size.size}</p>
                    <p>Quantity</p>
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
                    <p>Price: {item.product.price}</p>

                        <FontAwesomeIcon 
                            icon={faTrash} 
                            style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }} 
                            onClick={() => handleDeleteItem(item.id)}
                            />

                </div>
            ))}

            <div className="mt-5">
                <p className="font-bold text-xl">Total Price: {totalPrice}</p>
            </div>
        </div>
    );
}

export default CartModal;
