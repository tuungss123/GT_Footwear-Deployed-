import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const BurgerMenu = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get('https://gt-footwear-deployed.onrender.com/gt/brands/')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Error fetching Brands List:', error);
            });
    }, []);

    return (
        <div className="fixed right-0 top-[120px] z-10 w-[60%] h-[480px] bg-gray-50 rounded-xl">
            <div className="flex flex-col justify-center">
                <Link to="/" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg font-semibold">
                    Home
                </Link>
                <Link to="/new-arrivals" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg font-semibold">
                    New Releases
                </Link>
                <p className="text-gray-800 px-3 py-2 text-lg font-semibold">
                    Brands
                </p>
                <div className=" flex flex-col items-center">
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <Link
                                key={brand.id}
                                to={`/${brand.name}`} // Adjust the route as needed
                                className="block text-gray-800 hover:text-blue-500 px-3 py-2 text-md"
                            >
                                {brand.name}
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-800 px-3 py-2 text-md">Loading...</p>
                    )}
                </div>
                <Link to="/mens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg font-semibold">
                    Mens
                </Link>
                <Link to="/womens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg font-semibold">
                    Womens
                </Link>
                <Link to="/contact-us" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg font-semibold">
                    Contact Us
                </Link>
                <Link to="/cart" className="text-gray-800 hover:text-blue-500 px-3 py-2">
                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px', color: 'gray' }} />
                </Link>
            </div>
        </div>
    );
};

export default BurgerMenu;
