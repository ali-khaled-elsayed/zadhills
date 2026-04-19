'use client';

import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        apiUrl('/contact'),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Home Page Contact Form',
          message: formData.message,
        }
      );

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-subtle-architecture">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4 animate-slide-up">Get in touch with us</h2>
            <p className="text-black-100 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Leave your details and our real estate consultants will contact you to help you find the perfect property.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-black animate-slide-right">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Free consultation</h3>
                  <p className="text-black">Expert advice at no cost</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-black animate-slide-right" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Best prices guaranteed</h3>
                  <p className="text-black">Competitive pricing for all properties</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-black animate-slide-right" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Flexible payment plans</h3>
                  <p className="text-black">Easy installment options available</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg animate-slide-left">
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent"
                    placeholder="Tell us about your requirements"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1f261e] text-white py-3 px-6 rounded-md hover:bg-[#333333] transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
