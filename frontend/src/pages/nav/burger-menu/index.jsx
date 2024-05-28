import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
const BurgerMenu = () => {
    return(
    <div className="fixed right-0 top-[120px] z-10 w-[60%] h-[35%] bg-gray-50 white rounded-xl">
        <div className="flex flex-col justify-center">
            <Link to="/" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Home
            </Link>
            <Link to="/new-arrivals" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              New Releases
            </Link>
            <Link to="/brands" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Brands
            </Link>
            <Link to="/mens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Mens
            </Link>
            <Link to="/womens" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Womens
            </Link>
            <Link to="/contact-us" className="text-gray-800 hover:text-blue-500 px-3 py-2 text-lg">
              Contact Us
            </Link>
            <Link to="/cart" className="text-gray-800 hover:text-blue-500">
                <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '28px', color: 'gray' }} />
              </Link>
        </div>
    </div>)
}
export default BurgerMenu