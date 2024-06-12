import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/gt/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching the products:', error);
            });
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/gt/cart/add/', {
                product: product.id,
                quantity: 1,
                size: 1 
            },{
                withCredentials:true
            });
            console.log('Product added to cart:', response.data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-screen-lg">
                <div className='font-bold text-3xl mb-4 ml-4'>New Arrivals</div>
                <div className="h-auto flex flex-wrap justify-center">
                    {products.slice(-10).map(product => (
                        <div key={product.id} className="w-[200px] h-[320px] rounded overflow-hidden shadow-lg m-2">
                            <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                            <div className="px-6 py-4">
                                <div className="font-bold text-md mb-2">{product.name}</div>
                                <p className="text-gray-700 text-sm">{product.brand_name}</p>
                                <p className="text-gray-700 text-sm">{product.gender}</p>
                                <div className='flex flex-row justify-between'>
                                    <p className="text-gray-900 text-sm font-bold">{product.price} PHP</p>
                                    <FontAwesomeIcon 
                                        icon={faShoppingCart} 
                                        style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }} 
                                        onClick={() => addToCart(product)} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewArrivals;
