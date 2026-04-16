'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchFilters() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    area: '',
    unit_type: '',
    price_per_meter: '',
    delivery_date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    router.push(`/projects?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        {/* Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Area
          </label>
          <select
            name="area"
            value={filters.area}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f261e] focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
          >
            <option value="" className="text-gray-400">All Areas</option>
            <option value="new-cairo" className="text-gray-900">New Cairo</option>
            <option value="north-coast" className="text-gray-900">North Coast</option>
            <option value="new-capital" className="text-gray-900">New Capital</option>
            <option value="6-october" className="text-gray-900">6 October</option>
            <option value="el-sheikh-zayed" className="text-gray-900">El Sheikh Zayed</option>
          </select>
        </div>

        {/* Unit Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع الوحدة
          </label>
          <select
            name="unit_type"
            value={filters.unit_type}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f261e] focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
          >
            <option value="" className="text-gray-400">All Types</option>
            <option value="apartment" className="text-gray-900">Apartment</option>
            <option value="villa" className="text-gray-900">Villa</option>
            <option value="townhouse" className="text-gray-900">Townhouse</option>
            <option value="penthouse" className="text-gray-900">Penthouse</option>
            <option value="studio" className="text-gray-900">Studio</option>
            <option value="office" className="text-gray-900">Office</option>
            <option value="shop" className="text-gray-900">Shop</option>
          </select>
        </div>

        {/* Price per meter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            سعر المتر
          </label>
          <select
            name="price_per_meter"
            value={filters.price_per_meter}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f261e] focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
          >
            <option value="" className="text-gray-400">Any Price</option>
            <option value="5000-10000" className="text-gray-900">5,000 - 10,000 EGP</option>
            <option value="10000-15000" className="text-gray-900">10,000 - 15,000 EGP</option>
            <option value="15000-20000" className="text-gray-900">15,000 - 20,000 EGP</option>
            <option value="20000+" className="text-gray-900">20,000+ EGP</option>
          </select>
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            موعد التسليم
          </label>
          <select
            name="delivery_date"
            value={filters.delivery_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f261e] focus:border-transparent appearance-none bg-white text-gray-900 font-medium"
          >
            <option value="" className="text-gray-400">Any Time</option>
            <option value="2024" className="text-gray-900">2024</option>
            <option value="2025" className="text-gray-900">2025</option>
            <option value="2026" className="text-gray-900">2026</option>
            <option value="2027" className="text-gray-900">2027</option>
            <option value="ready" className="text-gray-900">Ready to Move</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-8 py-3 bg-[#1f261e] text-white font-semibold rounded-lg hover:bg-[#333333] transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}