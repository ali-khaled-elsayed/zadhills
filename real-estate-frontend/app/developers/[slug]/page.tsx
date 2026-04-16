import Image from 'next/image';
import Link from 'next/link';
import type { Developer, Project, PaginatedResponse } from '@/types';
import { getImageUrl } from '@/utils/images';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface DeveloperDetailResponse {
  developer: Developer;
  projects: PaginatedResponse<Project>;
}

async function fetchDeveloper(slug: string): Promise<DeveloperDetailResponse> {
  const res = await fetch(`${API_URL}/developers/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load developer details');
  }
  const json = await res.json();
  return json.data as DeveloperDetailResponse;
}

interface DeveloperPageProps {
  params: {
    slug: string;
  };
}

export default async function DeveloperDetailPage({ params }: DeveloperPageProps) {
  const { developer, projects } = await fetchDeveloper(params.slug);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="rounded-[2rem] bg-[#1f261e] p-8 text-white shadow-xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative h-28 w-28 overflow-hidden rounded-3xl bg-slate-100">
                    <Image
                      src={getImageUrl(developer.logo)}
                      alt={developer.name_en}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-[#ede5d8]/70">Developer</p>
                    <h1 className="mt-3 text-4xl font-bold">{developer.name_en}</h1>
                  </div>
                </div>

                <div className="space-y-4 text-slate-200">
                  <p className="text-lg leading-8">
                    {developer.description_en || 'A trusted developer building premium real estate projects across Egypt.'}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {developer.website && (
                      <div className="rounded-3xl bg-slate-900/60 p-5">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Website</p>
                        <a
                          href={developer.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block text-base font-semibold text-white hover:text-sky-300"
                        >
                          {developer.website}
                        </a>
                      </div>
                    )}
                    {developer.phone && (
                      <div className="rounded-3xl bg-slate-900/60 p-5">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Phone</p>
                        <p className="mt-2 text-base font-semibold text-white">{developer.phone}</p>
                      </div>
                    )}
                    {developer.email && (
                      <div className="rounded-3xl bg-slate-900/60 p-5">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Email</p>
                        <p className="mt-2 text-base font-semibold text-white">{developer.email}</p>
                      </div>
                    )}
                    {developer.address_en && (
                      <div className="rounded-3xl bg-slate-900/60 p-5">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Address</p>
                        <p className="mt-2 text-base font-semibold text-white">{developer.address_en}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-5">Quick facts</h2>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                    <span>Projects</span>
                    <span className="font-semibold text-slate-900">{projects?.data?.length ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
                    <span>Status</span>
                    <span className="font-semibold text-slate-900">{developer.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Joined</span>
                    <span className="font-semibold text-slate-900">{new Date(developer.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Developer projects</h2>
          
        </div>

        {projects?.data?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.data.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 text-xs uppercase tracking-[0.4em] text-slate-400">Project</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{project.title_en}</h3>
                <p className="text-sm leading-6 text-slate-600 line-clamp-3">
                  {project.short_description_en || 'Premium residential and investment-focused property.'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
            No projects available for this developer.
          </div>
        )}
      </section>
    </main>
  );
}
