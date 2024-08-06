import { useEffect, useState } from "react";
import axios from "axios";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const fetchCartItems = () => {
        axios.get('http://127.0.0.1:8000/gt/cart/items/', { withCredentials: true })
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error('Error fetching Cart Items:', error);
            });
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/gt/cart/remove/${id}`, { withCredentials: true });
        fetchCartItems();
    };

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
                await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`, { quantity: newQuantity }, { withCredentials: true });
                fetchCartItems();
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        })();
    };

    const handleMinusQuantity = (id, quantity) => {
        (async () => {
            try {
                const newQuantity = parseInt(quantity, 10) - 1;
                await axios.put(`http://127.0.0.1:8000/gt/cart/update/${id}/`, { quantity: newQuantity }, { withCredentials: true });
                fetchCartItems();
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        })();
    };

    const handleCheckout = async () => {
        try {
            const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

            const orderResponse = await axios.post('http://127.0.0.1:8000/gt/order/create/', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: address,
                total_amount: totalAmount,
                items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            }, { withCredentials: true });

            const orderId = orderResponse.data.id;

            const checkoutResponse = await axios.post('http://127.0.0.1:8000/gt/checkout/create/', {
                amount: totalAmount,
                order_id: orderId
            }, { withCredentials: true });

            window.location.href = checkoutResponse.data.checkout_url;
        } catch (error) {
            console.error('Error initiating checkout session:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col w-full md:w-2/3 pr-0 md:pr-6">
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
                    <div key={item.id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 mb-4 shadow-lg rounded-lg">
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
                            <div className="flex items-center">
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <div className="flex ml-1">
                                    <button className="pr-1 text-gray-600 hover:text-black" onClick={() => handleAddQuantity(item.id, item.quantity)}>+</button>
                                    <button className="text-gray-600 hover:text-black" disabled={item.quantity === 1} onClick={() => handleMinusQuantity(item.id, item.quantity)}>-</button>
                                </div>
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

            <div className="w-full md:w-1/3 p-4 bg-white shadow-lg rounded-lg mt-4 md:mt-0 h-auto md:h-auto">
                <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            placeholder="Enter your First Name"
                            className="p-2 border border-gray-300 rounded"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            placeholder="Enter your Last Name"
                            className="p-2 border border-gray-300 rounded"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your Email"
                            className="p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Contact Number</label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Enter your Contact Number"
                            className="p-2 border border-gray-300 rounded"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold">Address</label>
                        <input
                            name="address"
                            type="text"
                            placeholder="Enter your address"
                            className="p-2 border border-gray-300 rounded"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </form>
                <h2 className="text-2xl font-bold mb-4 mt-8">Summary</h2>
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold">Total</div>
                    <div className="text-2xl font-bold">₱{cart.reduce((total, item) => total + item.product.price * item.quantity, 0)}</div>
                </div>
                <button
                    className="w-full bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                    onClick={handleCheckout}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default Cart;
