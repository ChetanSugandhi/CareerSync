import React, { useState } from "react";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-10">
      <div className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-2xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Contact Info */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-6 text-lg">Have questions or ideas? Reach out and let’s connect.</p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" /> support@jobinternhub.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5" /> Technical Education Dept, Jaipur, Rajasthan
              </li>
            </ul>
          </div>
          <p className="text-sm mt-10 opacity-70">We usually reply within 24 hours.</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <User className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Chetan Sugandhi"
                className="w-full p-2 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full p-2 focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Message</label>
            <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2">
              <MessageSquare className="text-gray-400 w-5 h-5 mr-2 mt-1" />
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full p-1 focus:outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
