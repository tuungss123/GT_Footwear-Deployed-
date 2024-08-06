// eslint-disable-next-line no-unused-vars
import React from 'react';

const ContactUs = () => {
  return (
    
    <div className="max-w-lg mx-auto p-4">
      <div className="flex justify-center mb-6">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
      </div>

      <form>
        <div className="grid gap-4 mb-4">
          <div className="md:flex md:gap-4">
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mb-4 md:mb-0" 
              placeholder="Name"
           
            />
            <input
              type="email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
              placeholder="Email *"
              required
            />
          </div>
          <input
            type="tel"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="Phone number"
           
          />
          <textarea
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            placeholder="Comment"
            rows="4"
          
          />
        </div>
        <button
          type="submit"
          className=" outline outline-1 bg-white hover:bg-black text-black hover:text-white font-medium py-2 px-4 rounded "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
