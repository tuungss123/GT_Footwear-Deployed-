/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const MensPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        axios.get('https://gt-footwear-deployed.onrender.com/gt/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching the products:', error);
            });
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const addToCart = async (product, quantity, size) => {
        try {
            const response = await axios.post('https://gt-footwear-deployed.onrender.com/gt/cart/add/', {
                product: product.id,
                quantity,
                size
            },{
                withCredentials: true
            });
            console.log('Product added to cart:', response.data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        if (value === 'lowToHigh') {
            setProducts([...products].sort((a, b) => a.price - b.price));
        } else if (value === 'highToLow') {
            setProducts([...products].sort((a, b) => b.price - a.price));
        }
    };

    return (
        
        <div className="h-auto flex justify-center flex-wrap m-10">
            <div className="w-full flex  justify-end mb-4  ">
                <select onChange={handleSortChange} value={sortOption} className="p-2 border rounded">
                    <option className='hidden' value="">Sort by</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
            
            {products.map(product => {
                if (product.gender === "Mens") {
                    const productNameWords = product.name.split(' ');
                    const filteredName = productNameWords.filter(word => word !== 'Mens').join(' ');
                    return (
                        <div key={product.id} className="w-[200px] h-[320px] rounded overflow-hidden shadow-lg m-4">
                            <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-md">{filteredName}</div>
                                <p className="text-gray-700 text-sm">{product.brand_name}</p>
                                <p className="text-gray-700 text-sm">{product.gender}</p>
                                <div className='flex flex-row justify-between'>
                                    <p className="text-gray-900 text-sm font-bold">{product.price} PHP</p>
                                    <FontAwesomeIcon 
                                        icon={faShoppingCart} 
                                        style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} 
                                        onClick={() => openModal(product)} 
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
            {selectedProduct && (
                <Modal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAddToCart={addToCart}
                />
            )}
        </div>
    );
};


const Modal = ({ product, isOpen, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [availableSizes, setAvailableSizes] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        if (product && isOpen) {
            axios.get(`https://gt-footwear-deployed.onrender.com/gt/sizes/${product.id}/`)
                .then(response => {
                    setAvailableSizes(response.data);
                })
                .catch(error => {
                    console.error('Error fetching sizes:', error);
                });
        }
        
    }, [product, isOpen]);

    useEffect(() => {
        if (size) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [size]);

    if (!isOpen) return null;

    const handleAddToCart = () => {
        onAddToCart(product, quantity, size);
        onClose();
    };

    const handleSizeClick = (sizeId) => {
        setSize(sizeId);
        setSelectedSize(sizeId);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-[#292929] text-white p-6 flex xs:flex-col lg:flex-row items-center rounded-2xl shadow-lg w-2/3 max-w-xl">
                <img className="xs:w-[80%] sm:w-[50%] h-auto mb-4 rounded-2xl" src={product.picture_url} alt={product.name} />
                <div className="px-6 py-4">
                    <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
                    <p className="text-sm mb-4 text-center">{product.brand_name}</p>
                    <p className=" text-sm font-bold mb-4">{product.price} PHP</p>
                    <div className="mb-4">
                        <label className="block mb-2">Size</label>
                        <div className="flex flex-wrap">
                            {availableSizes.map(size => (
                                <div key={size.id}>
                                    <button
                                        value={size.id}
                                        onClick={() => handleSizeClick(size.id)}
                                        className={`p-2 m-1 border rounded ${selectedSize === size.id ? 'bg-blue-800 text-white' : 'bg-white text-black'} ${size.quantity_available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={size.quantity_available === 0}
                                    >
                                        {size.size}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="w-full p-2 border rounded text-black"
                        />
                    </div>
                    <div className="flex justify-end w-full">
                        <button
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className="bg-black sm:w-auto xs:w-[50%] text-white px-4 py-2 rounded mr-2"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 sm:w-auto xs:w-[50%] text-black px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MensPage;
