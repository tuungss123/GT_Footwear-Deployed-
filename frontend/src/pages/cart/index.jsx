import { useEffect, useState } from "react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const fetchCartItems = () => {
        axios.get('http://127.0.0.1:8000/gt/cart/items/', { withCredentials: true })
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error('Error fetching Cart Items:', error);
            });
    }

    useEffect(() => {
        fetchCartItems();
    }, []);


    const handleDelete =  async (id) => 
         {
            await axios.delete(`http://127.0.0.1:8000/gt/cart/remove/${id}`,{withCredentials:true})
            fetchCartItems()
        }

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedItems(cart.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
        
    };  
    const handleAddQuantity = (id, quantity) => {
        (async () => {
            try {
                const newQuantity = parseInt(quantity, 10) + 1;
    
                await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`, 
                {quantity: newQuantity},
                {withCredentials: true});
                            fetchCartItems()
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        })();
    }
    const handleMinusQuantity = (id, quantity) => {
        (async () => {
            try {
                const newQuantity = parseInt(quantity, 10) - 1;
    
                await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`,
                {quantity: newQuantity },
                { withCredentials: true });
                          fetchCartItems()
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        })();
    }
    
    
 

    return (
        <div className="flex flex-row p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col w-2/3 pr-6">
                <h1 className="text-3xl font-bold mb-4">Cart({cart.length})</h1>
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <label className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="mr-2" 
                            onChange={handleSelectAll}
                            checked={selectedItems.length === cart.length}
                        />
                        Select All
                    </label>
                </div>
                {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 shadow-lg rounded-lg">
                        <input 
                            type="checkbox" 
                            className="mr-2" 
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                        />
                        <img className="w-20 h-20 object-contain" src={item.product.picture_url} alt={item.product.name} />
                        <div className="flex flex-col ml-4 flex-grow">
                            <p className="text-lg font-semibold">{item.product.name}</p>
                            <p className="text-gray-600">Men&apos;s Shoes</p>
                            <p className="text-gray-600">Size: {item.size.size}</p>
                            <div>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <button onClick={() => handleAddQuantity(item.id, item.quantity)}>+</button>
                            <button disabled={item.quantity == 0} 
                            onClick={() => handleMinusQuantity(item.id, item.quantity)}>-</button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold">₱{item.product.price}</p>
                        </div>
                        <button 
                            onClick={() => handleDelete(item.id)} 
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                             <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg h-40">
                <h2 className="text-2xl font-bold mb-4">Summary</h2>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">Total</div>
                    <div className="text-2xl font-bold">₱{cart.reduce((total, item) => total + item.product.price * item.quantity, 0)}</div>
                </div>
                <button className="w-full bg-black text-white px-6 py-2 rounded-lg">CHECKOUT</button>
            </div>
        </div>
    );
}

export default Cart;
