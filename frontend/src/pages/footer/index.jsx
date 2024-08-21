import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'; // Import Facebook icon

const Footer = () => {
    return (
        <div className="bg-black text-white h-[120px] flex flex-col justify-center items-center mt-[50px]">
            <div className="text-center">
                <p className="text-sm mb-2">&copy; 2024 GT Footwear. All rights reserved.</p>
                <div className="mb-2">
                    <Link 
                        to="/contact-us" 
                        className="hover:text-gray-400 transition-colors duration-300 transform hover:scale-105"
                    >
                        Contact Us
                    </Link>
                </div>
                <p className="text-sm">Follow us on:
                    <a 
                        href="https://www.facebook.com/profile.php?id=61556796748395" 
                        className="ml-2 hover:opacity-75 transition-opacity duration-300 transform hover:scale-110" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon 
                            icon={faFacebookF} 
                            className="text-white" 
                            style={{ fontSize: '20px', marginLeft: '5px' }} 
                        />
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
