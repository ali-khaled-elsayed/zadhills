'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '@/utils/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface Developer {
  id: number;
  name_en: string;
  logo: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [developersLoaded, setDevelopersLoaded] = useState(false);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(apiUrl('/developers?limit=6'));
        setDevelopers(response.data.data?.slice(0, 6) || []);
      } catch (error) {
        console.error('Failed to fetch developers:', error);
        setDevelopers([]);
      } finally {
        setDevelopersLoaded(true);
      }
    };

    fetchDevelopers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(apiUrl('/contact'), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#ede5d8] to-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1f261e] mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-[#1f261e]">
              Get in touch with our team and let us help you find your perfect property
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#1f261e] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f261e] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f261e] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent outline-none"
                      placeholder="+20 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f261e] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent outline-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f261e] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ede5d8] focus:border-transparent outline-none resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1f261e] text-white py-3 rounded-lg font-semibold hover:bg-[#333333] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-[#1f261e] mb-6">Our Location</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#1f261e] mb-2">Address</h4>
                      <p className="text-[#1f261e]">
                        13 Abu Dawood Al-Zahiri, District 6
                        <br />
                        Nasr City, Cairo, Egypt
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1f261e] mb-2">Phone</h4>
                      <a
                        href="tel:+2010 08982422"
                        className="text-[#ede5d8] font-semibold hover:text-[#1f261e] transition"
                      >
                        +201008982422
                      </a>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1f261e] mb-2">Email</h4>
                      <a
                        href="mailto:info@zadhills.com"
                        className="text-[#ede5d8] font-semibold hover:text-[#1f261e] transition"
                      >
                        info@zadhills.com
                      </a>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#1f261e] mb-2">Working Hours</h4>
                      <p className="text-[#1f261e]">
                        Sunday - Thursday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/201008982422?text=Hello%20ZAD%20Hills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-900 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.88 1.273c-1.54.92-2.6 2.957-2.6 5.048 0 5.076 4.122 9.21 9.196 9.21 1.039 0 2.047-.154 3.006-.45l3.215.84c.563.149 1.077-.057 1.201-.611l.853-3.196c.745-1.41 1.159-2.922 1.159-4.405 0-5.076-4.122-9.21-9.196-9.21m0-1.98C13.02 2.26 20 9.342 20 18.176c0 2.254-.563 4.408-1.548 6.286l2.526 3.256c.667.856.156 2.167-.823 2.402l-4.302 1.124c-1.333-.456-2.574-1.08-3.724-1.841-1.15-.76-2.205-1.69-3.156-2.76C4.93 23.627 2 19.604 2 15.062c0-3.542 1.348-6.68 3.56-8.976C7.773 3.335 10.704 2.24 13.579 2.24z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Partners Section */}
        {developers.length > 0 ? (
          <section className="py-16 bg-[#f5f3f0]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-[#1f261e] mb-12 text-center">
                Our Partners
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {developers.map((developer) => (
                  <div
                    key={developer.id}
                    className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {developer.logo ? (
                      <img
                        src={developer.logo}
                        alt={developer.name_en}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <p className="text-center text-gray-600 text-sm font-medium">
                        {developer.name_en}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : developersLoaded ? (
          <section className="py-16 bg-[#f5f3f0]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
                No data to display
              </div>
            </div>
          </section>
        ) : null}

        {/* Connect With Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1f261e] mb-8 text-center">
              Connect With Us
            </h2>
            <p className="text-lg text-[#1f261e] text-center mb-12 max-w-2xl mx-auto">
              Follow us on social media for the latest property listings and market insights
            </p>

            <div className="flex justify-center gap-8">
              <a
                href="https://www.facebook.com/Zadhillsrealestate/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#ede5d8] rounded-full flex items-center justify-center hover:bg-[#1f261e] transition-colors group"
              >
                <svg className="w-8 h-8 text-[#1f261e] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.408 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/zadhillsrealestate/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#ede5d8] rounded-full flex items-center justify-center hover:bg-[#1f261e] transition-colors group"
              >
                <svg className="w-8 h-8 text-[#1f261e] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.517 2.495 5.784 2.224 7.15 2.163 8.416 2.105 8.796 2.093 12 2.093zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.63.394 3.677 1.347 2.724 2.3 2.459 3.441 2.401 4.722.343 5.994.329 6.404.329 12s.014 6.006.072 7.278c.058 1.281.323 2.422 1.276 3.375.953.953 2.094 1.218 3.375 1.276C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.281-.058 2.422-.323 3.375-1.276.953-.953 1.218-2.094 1.276-3.375.058-1.272.072-1.682.072-7.278s-.014-6.006-.072-7.278c-.058-1.281-.323-2.422-1.276-3.375C19.37.394 18.229.13 16.948.072 15.668.014 15.259 0 12 0z"/>
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>                
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@zadhills"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#ede5d8] rounded-full flex items-center justify-center hover:bg-[#1f261e] transition-colors group"
              >
                <svg className="w-8 h-8 text-[#1f261e] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.03 2.01h3.62c.08 1.83.73 3.49 1.76 4.78a5.669 5.669 0 004.07 1.86v3.45c-1.9 0-3.58-.73-4.86-1.92v5.53c0 4.07-3.3 7.37-7.37 7.37-4.07 0-7.37-3.3-7.37-7.37s3.3-7.37 7.37-7.37c.08 0 .16.01.24.01v3.12c-.08 0-.16-.01-.24-.01-2.35 0-4.25 1.9-4.25 4.25s1.9 4.25 4.25 4.25 4.25-1.9 4.25-4.25V7.25h2.55c.05.77.37 1.52.88 2.12.51.61 1.2 1.05 1.97 1.28.28.09.57.15.87.17v-3.34a5.667 5.667 0 00-4.48-2.63v.01h-.02z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
  );
}
