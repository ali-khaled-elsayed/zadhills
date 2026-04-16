'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CitiesDropdown from './CitiesDropdown';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('EGP');
  const [language, setLanguage] = useState('en');

  const isActivePage = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  const getLinkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActivePage(href)
        ? 'bg-[#1f261e] text-[#ede5d8]'
        : 'text-[#1f261e] hover:text-[#ede5d8]'
    }`;

  const getMobileLinkClass = (href: string) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActivePage(href)
        ? 'bg-[#1f261e] text-[#ede5d8]'
        : 'text-[#1f261e] hover:text-[#ede5d8]'
    }`;

  const currencies = [
    { code: 'EGP', name: 'pounds', flag: '/flags/eg.svg' },
    { code: 'USD', name: 'dollar', flag: '/flags/us.svg' },
    { code: 'AED', name: 'dirhams', flag: '/flags/ae.svg' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f261e] shadow-sm">
                <Image
                  src="/logo.svg"
                  alt="ZAD Hills Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-lg font-bold text-[#1f261e]">
                ZAD Hills
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={getLinkClass('/')}>Home</Link>
              <CitiesDropdown />
              <Link href="/developers" className={getLinkClass('/developers')}>Developers</Link>
              <Link href="/blog" className={getLinkClass('/blog')}>Blogs</Link>
              <Link href="/about-us" className={getLinkClass('/about-us')}>About Us</Link>
              <Link href="/contact-us" className={getLinkClass('/contact-us')}>Contact Us</Link>
            </div>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switch */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-[#1f261e] hover:text-[#ede5d8] px-3 py-2 rounded-md text-sm font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button className="flex items-center space-x-1 text-[#1f261e] hover:text-[#ede5d8] px-3 py-2 rounded-md text-sm font-medium">
                <span>{currencies.find(c => c.code === currency)?.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown would go here */}
            </div>

            {/* Phone */}
            <a href="tel:+201008982422" className="text-[#1f261e] hover:text-[#ede5d8] px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              010 08982422
            </a>

            {/* Login Button */}
            {/* <button className="bg-[#1f261e] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#333333]">
              Login
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-[#ede5d8] inline-flex items-center justify-center p-2 rounded-md text-[#1f261e] hover:text-[#333333] hover:bg-gray-100"
            >
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link href="/" className={getMobileLinkClass('/')}>
              Home
            </Link>
            <div className="px-3 py-2">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Projects by City</p>
              <CitiesDropdown />
            </div>
            <Link href="/developers" className={getMobileLinkClass('/developers')}>
              Developers
            </Link>
            <Link href="/about-us" className={getMobileLinkClass('/about-us')}>
              About Us
            </Link>
            <Link href="/blog" className={getMobileLinkClass('/blog')}>
              Blog
            </Link>
            <Link href="/contact-us" className={getMobileLinkClass('/contact-us')}>
              Contact
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="text-[#1f261e] hover:text-[#ede5d8] text-base font-medium"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
              <a href="tel:+2010 08982422" className="text-[#1f261e] hover:text-[#ede5d8] text-base font-medium">
                010 08982422
              </a>
              {/* <button className="bg-[#1f261e] text-white px-4 py-2 rounded-md text-base font-medium hover:bg-[#333333]">
                Login
              </button> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;