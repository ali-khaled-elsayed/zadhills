'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project, PaginatedResponse } from '@/types';
import { getImageUrl } from '@/utils/images';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface SearchFilters {
  area?: string;
  unit_type?: string;
  price_per_meter?: string;
  delivery_date?: string;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({});

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parse search params
        const params = new URLSearchParams(searchParams.toString());
        const filterObj: SearchFilters = {};
        
        if (params.get('area')) filterObj.area = params.get('area') || '';
        if (params.get('unit_type')) filterObj.unit_type = params.get('unit_type') || '';
        if (params.get('price_per_meter')) filterObj.price_per_meter = params.get('price_per_meter') || '';
        if (params.get('delivery_date')) filterObj.delivery_date = params.get('delivery_date') || '';

        setFilters(filterObj);

        // Build API query string
        const apiParams = new URLSearchParams();
        if (filterObj.area) apiParams.set('area', filterObj.area);
        if (filterObj.unit_type) apiParams.set('unit_type', filterObj.unit_type);
        if (filterObj.price_per_meter) apiParams.set('price_range', filterObj.price_per_meter);
        if (filterObj.delivery_date) apiParams.set('delivery_date', filterObj.delivery_date);
        apiParams.set('per_page', '12');

        const res = await fetch(`${API_URL}/projects?${apiParams.toString()}`);
        if (!res.ok) {
          throw new Error('Failed to fetch search results');
        }

        const json = await res.json();
        const data = json.data as PaginatedResponse<Project>;
        setProjects(data?.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  const getFilterLabel = (key: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      area: {
        'new-cairo': 'New Cairo',
        'north-coast': 'North Coast',
        'new-capital': 'New Capital',
        '6-october': '6 October',
        'el-sheikh-zayed': 'El Sheikh Zayed',
      },
      unit_type: {
        apartment: 'Apartment',
        villa: 'Villa',
        townhouse: 'Townhouse',
        penthouse: 'Penthouse',
        studio: 'Studio',
        office: 'Office',
        shop: 'Shop',
      },
      delivery_date: {
        '2024': '2024',
        '2025': '2025',
        '2026': '2026',
        '2027': '2027',
        ready: 'Ready to Move',
      },
    };
    return labels[key]?.[value] || value;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-[#1f261e] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#ede5d8] mb-4">Search Results</h1>
          <p className="text-lg text-[#ede5d8]/80">
            {loading ? 'Loading results...' : `Found ${projects.length} project${projects.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {/* Active Filters Display */}
        {Object.keys(filters).length > 0 && (
          <div className="mb-10 flex flex-wrap gap-3">
            <span className="text-sm font-medium text-slate-600">Applied Filters:</span>
            {Object.entries(filters).map(([key, value]) => (
              <div key={key} className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900">
                {getFilterLabel(key, value as string)}
              </div>
            ))}
            <Link
              href="/"
              className="rounded-full bg-[#1f261e] px-4 py-2 text-sm font-medium text-[#ede5d8] hover:bg-[#333333]"
            >
              Clear Filters
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-flex animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f261e]" />
              <p className="mt-4 text-slate-600">Loading search results...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-800 font-medium">{error}</p>
            <Link
              href="/"
              className="mt-4 inline-block text-[#1f261e] hover:text-[#333333] font-semibold"
            >
              Try a new search →
            </Link>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.city?.slug || 'projects'}/${project.slug}`}
                className="group block rounded-3xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {project.cover_image ? (
                    <Image
                      src={getImageUrl(project.cover_image)}
                      alt={project.title_en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.4em] text-slate-400 font-semibold">
                      {project.project_type}
                    </span>
                    {project.status && (
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 transition-colors group-hover:text-[#1f261e]">
                    {project.title_en}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {project.short_description_en}
                  </p>

                  {/* Additional Details */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    {project.city && (
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{project.city.name_en}</span>
                      </div>
                    )}
                    {project.unit_type && (
                      <div className="text-xs text-slate-500">
                        Unit Type: <span className="font-semibold text-slate-700">{project.unit_type}</span>
                      </div>
                    )}
                    {project.price_from && (
                      <div className="text-sm font-semibold text-[#1f261e]">
                        From {project.price_from.toLocaleString()} EGP
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No projects found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search filters or browse our full selection.
            </p>
            <Link
              href="/"
              className="inline-block rounded-2xl bg-[#1f261e] px-6 py-3 font-semibold text-[#ede5d8] hover:bg-[#333333]"
            >
              Back to Home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
