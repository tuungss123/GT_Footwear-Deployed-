import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const MensPage = () => {
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

    return (
        <div className="min-h-screen h-auto flex justify-center flex-wrap m-10">
            {products.map(product =>{
                if(product.gender == "Mens"){
                    return(
                        (
                            <div key={product.id} className="w-[200px] h-[320px] rounded overflow-hidden shadow-lg m-4">
                                <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-md mb-2">{product.name}</div>
                                    <p className="text-gray-700 text-sm">{product.brand_name}</p>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-gray-900 text-sm font-bold">{product.price} PHP</p>
                                        <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '20px', color:'gray' }} />
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            } )}
        </div>
    );
}

export default MensPage;
