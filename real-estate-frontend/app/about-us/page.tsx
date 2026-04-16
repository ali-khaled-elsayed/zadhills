'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import axios from 'axios';

interface PageContent {
  content?: {
    about_section?: string;
    mission_section?: string;
    values_section?: string;
  };
}

export default function AboutUs() {
  const [pageData, setPageData] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/page-content?page=about-us`
        );
        setPageData(response.data.data || {});
      } catch (error) {
        console.error('Failed to fetch page content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#ede5d8] to-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1f261e] mb-6">
              About ZAD Hills
            </h1>
            <p className="text-lg text-[#1f261e] leading-relaxed">
              ZAD Hills is not just a real estate company; we offer a different and premium real estate experience in the Egyptian market. We are committed to transforming the way you buy, sell, and invest in properties.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#1f261e] mb-6">Our Story</h2>
                <p className="text-[#1f261e] mb-4 leading-relaxed">
                  ZAD Hills entered the real estate market with a clear mission: to change the concept of buying and selling in the minds of many and to redefine what a real estate company truly means.
                </p>
                <p className="text-[#1f261e] mb-4 leading-relaxed">
                  Unlike traditional real estate brokers, our role does not end with the completion of your transaction. Instead, our main relationship with you begins after the sale is completed. We believe in building long-term partnerships with our clients.
                </p>
                <p className="text-[#1f261e] leading-relaxed">
                  {pageData.content?.about_section || 'Our team comprises experienced professionals with deep knowledge of the Egyptian real estate market. We are dedicated to providing exceptional service at every stage of your real estate journey.'}
                </p>
              </div>
              <div className="bg-[#ede5d8] rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-24 h-24 mx-auto text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-2m-9-2l4 2m0-5L9 7m5 5l4-2" />
                  </svg>
                  <p className="text-[#1f261e] mt-4">Real Estate Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-[#f5f3f0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1f261e] mb-12 text-center">Our Services</h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Pre-Sale Stage */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="w-14 h-14 bg-[#ede5d8] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1f261e] mb-4">Pre-Sale Services</h3>
                <ul className="space-y-3 text-[#1f261e]">
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Wide variety of premium units (residential, commercial, administrative)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Expert guidance on all available projects in the market</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Comprehensive analysis of options based on your needs and budget</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Assistance in determining the best time to invest</span>
                  </li>
                </ul>
              </div>

              {/* Post-Sale Stage */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="w-14 h-14 bg-[#ede5d8] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1f261e] mb-4">Post-Sale Services</h3>
                <ul className="space-y-3 text-[#1f261e]">
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Ongoing support with project execution tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Legal and financial consultations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Installment reminders and payment assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ede5d8] mr-3">✓</span>
                    <span>Latest real estate market updates and insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1f261e] mb-12 text-center">Why Choose ZAD Hills?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede5d8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1f261e] mb-3">Market Research</h3>
                <p className="text-[#1f261e]">
                  Intensive data analysis and market studies to ensure you make informed decisions
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede5d8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1f261e] mb-3">Best Value</h3>
                <p className="text-[#1f261e]">
                  Competitive pricing and excellent ROI potential across all our portfolio projects
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#ede5d8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1f261e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1f261e] mb-3">Expert Team</h3>
                <p className="text-[#1f261e]">
                  Experienced professionals with extensive knowledge of the Egyptian market
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#f5f3f0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-[#1f261e] mb-8 text-center">Our Values</h2>
            
            <div className="bg-white rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-[#1f261e] mb-4">Trust & Transparency</h3>
                  <p className="text-[#1f261e] mb-6">
                    We believe in building relationships based on honesty, integrity, and clear communication with every client.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Client-Centric Approach</h3>
                  <p className="text-gray-700 mb-6">
                    Your success is our priority. We provide personalized solutions tailored to your unique needs and goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                  <p className="text-gray-700 mb-6">
                    We strive to deliver the highest quality service at every touchpoint of your real estate journey.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Long-Term Partnership</h3>
                  <p className="text-gray-700 mb-6">
                    Our relationship with you extends beyond the transaction—we're here to support you for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#ede5d8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#1f261e] mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-[#1f261e] mb-8 max-w-2xl mx-auto">
              Contact our team today to explore premium real estate opportunities with ZAD Hills
            </p>
            <a href="/contact-us" className="inline-block bg-[#1f261e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#333333] transition-colors">
              Get In Touch
            </a>
          </div>
        </section>
      </main>

    </div>
  );
}
