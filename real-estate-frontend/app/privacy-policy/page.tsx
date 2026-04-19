'use client';

import Link from 'next/link';
import { homePageContent } from '@/data/homeStaticData';

const informationCollected = [
  'Personal contact information such as name, email address, and phone number.',
  'Profile-related details you voluntarily share with us through forms or direct communication.',
  'Property inquiry details and preferences that help us provide more relevant real estate support.',
];

const informationUses = [
  'Providing, operating, and improving our website, services, and property-related content.',
  'Communicating with users and responding to inquiries, requests, and service needs.',
  'Sending information related to offers, services, updates, and relevant events when appropriate.',
  'Analyzing data and usage trends to improve user experience and better understand user needs and preferences.',
];

const informationSharing = [
  'We do not sell or share personal information with third parties for unauthorized marketing or advertising purposes.',
  'We may share limited information with trusted service providers when necessary to operate the website or deliver requested services.',
  'Information may be disclosed when required by law, regulation, or to protect our legal rights and website security.',
];

const trackingItems = [
  'IP address and browser type',
  'Pages visited and time spent on the website',
  'General usage patterns collected through cookies or similar technologies',
];

const userRights = [
  'Request access to the personal data we hold about you.',
  'Request correction of inaccurate or incomplete information.',
  'Request deletion of your personal data where applicable.',
  'Object to or limit certain types of data processing.',
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-[#1f261e] py-20">
          <img
            src={homePageContent.heroBackground}
            alt="Privacy Policy Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#1f261e]/90" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#ede5d8] mb-4">
              Home / Privacy Policy
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-[#ede5d8] leading-relaxed max-w-3xl">
              At ZAD Hills, we are committed to protecting the privacy of our users
              and safeguarding the information shared with us through our website.
              This page explains how we collect, use, store, and protect personal
              information when you browse our platform or contact our team.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
              <aside className="bg-[#f5f3f0] rounded-2xl p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-[#1f261e] mb-4">On this page</h2>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a href="#information-collected" className="text-[#1f261e] hover:text-black transition-colors">
                      1. Information Collected
                    </a>
                  </li>
                  <li>
                    <a href="#use-of-information" className="text-[#1f261e] hover:text-black transition-colors">
                      2. Use of Information
                    </a>
                  </li>
                  <li>
                    <a href="#sharing-information" className="text-[#1f261e] hover:text-black transition-colors">
                      3. Sharing Information
                    </a>
                  </li>
                  <li>
                    <a href="#tracking-analysis" className="text-[#1f261e] hover:text-black transition-colors">
                      4. Tracking & Analysis
                    </a>
                  </li>
                  <li>
                    <a href="#protection-security" className="text-[#1f261e] hover:text-black transition-colors">
                      5. Protection & Security
                    </a>
                  </li>
                  <li>
                    <a href="#user-rights" className="text-[#1f261e] hover:text-black transition-colors">
                      6. User Rights
                    </a>
                  </li>
                  <li>
                    <a href="#contact-information" className="text-[#1f261e] hover:text-black transition-colors">
                      7. Contact Information
                    </a>
                  </li>
                </ul>
              </aside>

              <div className="space-y-8">
                <section id="information-collected" className="bg-white border border-[#ede5d8] rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    1. Information Collected
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed mb-5">
                    We may collect certain personal information when users browse our
                    website, submit inquiries, request services, or communicate with our
                    team.
                  </p>
                  <ul className="space-y-3">
                    {informationCollected.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[#1f261e] leading-relaxed">
                        <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#1f261e]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="use-of-information" className="bg-[#f5f3f0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    2. Use of Information
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed mb-5">
                    The information we collect is used to improve the quality of our
                    services and to ensure a smoother, more relevant experience for our
                    users.
                  </p>
                  <ul className="grid gap-4 md:grid-cols-2">
                    {informationUses.map((item) => (
                      <li key={item} className="bg-white rounded-xl p-5 text-[#1f261e] leading-relaxed shadow-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="sharing-information" className="bg-white border border-[#ede5d8] rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    3. Sharing Information
                  </h2>
                  <div className="space-y-4 text-[#1f261e] leading-relaxed">
                    {informationSharing.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </section>

                <section id="tracking-analysis" className="bg-[#f5f3f0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    4. Tracking & Analysis
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed mb-5">
                    We may use cookies and similar technologies to understand how the
                    website is used and to improve functionality and performance. These
                    tools generally collect non-personal information such as:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {trackingItems.map((item) => (
                      <div key={item} className="bg-white rounded-xl p-5 shadow-sm">
                        <p className="text-[#1f261e] font-medium leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="protection-security" className="bg-white border border-[#ede5d8] rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    5. Protection & Security
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed">
                    We take appropriate technical and organizational measures to protect
                    personal information against unauthorized access, disclosure,
                    alteration, loss, or misuse. While no system can guarantee absolute
                    security, we work continuously to apply reasonable safeguards that
                    support the confidentiality and integrity of your information.
                  </p>
                </section>

                <section id="user-rights" className="bg-[#f5f3f0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    6. User Rights
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed mb-5">
                    Users may have the right to:
                  </p>
                  <ul className="space-y-3">
                    {userRights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[#1f261e]">
                        <span className="text-[#1f261e] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="contact-information" className="bg-[#ede5d8] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#1f261e] mb-4">
                    7. Contact Information
                  </h2>
                  <p className="text-[#1f261e] leading-relaxed mb-6">
                    If you have any questions about this privacy policy or would like to
                    exercise your data-related rights, please contact our team and we
                    will be happy to assist you.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#1f261e] mb-2">Email</h3>
                      <a
                        href="mailto:info@zadhills.com"
                        className="text-[#1f261e] hover:text-black transition-colors"
                      >
                        info@zadhills.com
                      </a>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#1f261e] mb-2">Contact Page</h3>
                      <Link
                        href="/contact-us"
                        className="text-[#1f261e] hover:text-black transition-colors"
                      >
                        Visit Contact Us
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
