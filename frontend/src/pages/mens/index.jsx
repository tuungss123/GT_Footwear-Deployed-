import { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="min-h-screen h-auto flex flex-wrap m-10">
            {products.map(product => (
                <div key={product.id} className="w-[200px] h-[320px] rounded overflow-hidden shadow-lg m-4">
                    <img className="w-[200px]" src={product.picture_url} alt={product.name} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-md mb-2">{product.name}</div>
                        <p className="text-gray-700 text-sm">{product.brand_name}</p>
                        <p className="text-gray-900 text-sm font-bold">{product.price} PHP</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MensPage;
