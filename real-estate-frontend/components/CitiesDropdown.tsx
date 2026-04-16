'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface City {
  id: number;
  name_en: string;
  name_ar: string;
  slug: string;
}

export default function CitiesDropdown() {
  const [cities, setCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
        const res = await fetch(`${API_URL}/cities?per_page=100`);
        if (res.ok) {
          const json = await res.json();
          setCities((json.data?.data ?? json.data) as City[]);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div className="relative group">
      <button className="px-3 py-2 rounded-md text-sm font-medium text-[#1f261e] hover:text-[#ede5d8] flex items-center">
        Projects
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop dropdown */}
      <div className="hidden group-hover:block absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-2xl border border-slate-200 py-2 z-[9999]">
        {isLoading ? (
          <div className="px-4 py-3 text-sm text-slate-500">Loading cities...</div>
        ) : cities.length > 0 ? (
          cities.map((city) => (
            <Link
              key={city.id}
              href={`/projects/${city.slug}`}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#1f261e]"
            >
              {city.name_en}
            </Link>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-slate-500">No cities available</div>
        )}
      </div>
    </div>
  );
}
