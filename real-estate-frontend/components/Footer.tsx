import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#1f261e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ZAD Hills Real Estate</h3>
            <p className="text-[#ede5d8]">
              Your safe place to buy all your real estate units because we offer the widest variety of projects and a premium after-sales service experience.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Zadhillsrealestate/" target="_blank" rel="noopener noreferrer" className="text-[#ede5d8] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.407 24 24 23.408 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/zadhillsrealestate/" target="_blank" rel="noopener noreferrer" className="text-[#ede5d8] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.517 2.495 5.784 2.224 7.15 2.163 8.416 2.105 8.796 2.093 12 2.093zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.63.394 3.677 1.347 2.724 2.3 2.459 3.441 2.401 4.722.343 5.994.329 6.404.329 12s.014 6.006.072 7.278c.058 1.281.323 2.422 1.276 3.375.953.953 2.094 1.218 3.375 1.276C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.281-.058 2.422-.323 3.375-1.276.953-.953 1.218-2.094 1.276-3.375.058-1.272.072-1.682.072-7.278s-.014-6.006-.072-7.278c-.058-1.281-.323-2.422-1.276-3.375C19.37.394 18.229.13 16.948.072 15.668.014 15.259 0 12 0z"/>
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
                <circle cx="18.406" cy="5.594" r="1.44"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@zadhills" target="_blank" rel="noopener noreferrer" className="text-[#ede5d8] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.03 2.01h3.62c.08 1.83.73 3.49 1.76 4.78a5.669 5.669 0 004.07 1.86v3.45c-1.9 0-3.58-.73-4.86-1.92v5.53c0 4.07-3.3 7.37-7.37 7.37-4.07 0-7.37-3.3-7.37-7.37s3.3-7.37 7.37-7.37c.08 0 .16.01.24.01v3.12c-.08 0-.16-.01-.24-.01-2.35 0-4.25 1.9-4.25 4.25s1.9 4.25 4.25 4.25 4.25-1.9 4.25-4.25V7.25h2.55c.05.77.37 1.52.88 2.12.51.61 1.2 1.05 1.97 1.28.28.09.57.15.87.17v-3.34a5.667 5.667 0 00-4.48-2.63v.01h-.02z"/>
              </svg>
            </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:+2010 08982422" className="flex items-center space-x-2 text-[#ede5d8] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>010 08982422</span>
              </a>
              <a href="mailto:sales@realestateplatform.com" className="flex items-center space-x-2 text-[#ede5d8] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>sales@realestateplatform.com</span>
              </a>
              <div className="flex items-start space-x-2 text-[#ede5d8]">
                <svg className="w-5 h-5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>13 Abu Dawood Al-Zahiri, District 6, Nasr City</span>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Important Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-[#ede5d8] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/site-map" className="text-[#ede5d8] hover:text-white transition-colors">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#ede5d8] hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Most Searched */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Most Searched</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cities" className="text-[#ede5d8] hover:text-white transition-colors">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/cities/new-cairo" className="text-gray-300 hover:text-white transition-colors">
                  New Cairo
                </Link>
              </li>
              <li>
                <Link href="/cities/north-coast" className="text-gray-300 hover:text-white transition-colors">
                  North Coast
                </Link>
              </li>
              <li>
                <Link href="/cities/new-capital" className="text-gray-300 hover:text-white transition-colors">
                  New Capital
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2026 All rights reserved - ZAD Hills Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;