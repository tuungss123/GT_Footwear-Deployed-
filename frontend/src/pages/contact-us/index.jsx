import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: '',
    subject: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.email.includes('@')) errors.email = 'Invalid email address';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', comment: '', subject: '' });
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 ">
          <h1 className="text-4xl font-semibold mb-6">Contact Us</h1>
          <form onSubmit={handleSubmit} className=" bg-black text-white shadow-md rounded-lg p-6 space-y-4">
            <div className="grid gap-4 mb-4 ">
              <div className="md:flex md:gap-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                    placeholder="Name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-gray-100 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Email *"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                >
                  <option value="">Select a subject</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Support Request">Support Request</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">Comment</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Comment"
                  rows="4"
                />
              </div>
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium mb-1">Attachment (optional)</label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  className="bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-gray-400 text-black font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
            {submitted && !loading && <p className="mt-4 text-green-500">Thank you for contacting us!</p>}
            {errors.server && <p className="text-red-500 text-xs mt-1">{errors.server}</p>}
          </form>
        </div>
        <div className="lg:w-1/2 space-y-8">
          <div className=" bg-black text-white shadow-md rounded-lg p-6 ">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Phone: +63 949 186 4744</li>
              <li>Email: mjtungul21@gmail.com/nicolgaviola@gmail.com</li>
              <li>Address: Angeles City, Pampanga, Philippines</li>
            </ul>
          </div>


          <div className=" bg-black text-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <iframe
              className="w-full h-64 rounded-lg shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.689817349586!2d-122.0838516846815!3d37.38605197982556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb685e2f8d17b%3A0x6e6b774c0411e0de!2sGoogleplex!5e0!3m2!1sen!2sus!4v1616363283570!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
