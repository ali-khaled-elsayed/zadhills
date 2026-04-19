import type { City, Project, PaginatedResponse } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/utils/images';
import NoData from '@/components/NoData';
import { fetchApiData } from '@/utils/api';

interface CityDetailResponse {
  city: City;
  projects: PaginatedResponse<Project>;
}

async function fetchCityProjects(citySlug: string): Promise<CityDetailResponse> {
  return (await fetchApiData<CityDetailResponse>(`/cities/${citySlug}`)) ?? {
    city: {} as City,
    projects: { data: [] },
  };
}

interface CityProjectsPageProps {
  params: {
    city_slug: string;
  };
}

export default async function CityProjectsPage({ params }: CityProjectsPageProps) {
  const { city, projects } = await fetchCityProjects(params.city_slug);

  if (!city?.id) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <NoData />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-[#1f261e] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {city.image && (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-3xl">
                <Image
                  src={getImageUrl(city.image)}
                  alt={city.name_en}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-sm uppercase tracking-[0.4em] text-[#ede5d8]/70 mb-4">Location</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#ede5d8] mb-4">{city.name_en}</h1>
            <p className="text-lg text-[#ede5d8]/80 max-w-2xl">
              {city.description_en || 'Discover premium real estate projects in this thriving location.'}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Projects</p>
            <h2 className="text-3xl font-bold text-slate-900">
              {projects?.data?.length ?? 0} projects in {city.name_en}
            </h2>
          </div>
          <Link
            href="/developers"
            className="inline-block text-sm font-semibold text-[#1f261e] hover:text-[#333333] transition-colors"
          >
            View all developers →
          </Link>
        </div>

        {projects?.data?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.data.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${params.city_slug}/${project.slug}`}
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
                  {project.price_from && (
                    <div className="text-sm font-semibold text-[#1f261e]">
                      From {project.price_from.toLocaleString()} EGP
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </section>
    </main>
  );
}
