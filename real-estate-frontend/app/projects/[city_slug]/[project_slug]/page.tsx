import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { getImageUrl } from '@/utils/images';
import { MapPin, Building2, DollarSign, Calendar, Users } from 'lucide-react';
import NoData from '@/components/NoData';
import { fetchApiData } from '@/utils/api';

async function fetchProject(projectSlug: string): Promise<Project> {
  return (await fetchApiData<Project>(`/projects/${projectSlug}`)) ?? ({} as Project);
}

interface ProjectDetailPageProps {
  params: {
    city_slug: string;
    project_slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await fetchProject(params.project_slug);

  if (!project?.id) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <NoData />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-white">
        {project.cover_image && (
          <div className="relative h-96 w-full">
            <Image
              src={getImageUrl(project.cover_image)}
              alt={project.title_en}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-8">
              <div className="mb-4 flex items-baseline gap-4">
                <Link
                  href={`/projects/${params.city_slug}`}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  ← Back to {project.city?.name_en}
                </Link>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#1f261e] px-4 py-2 text-sm font-semibold text-[#ede5d8] capitalize">
                    {project.project_type}
                  </span>
                  <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 capitalize">
                    {project.status}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {project.title_en}
              </h1>

              {project.short_description_en && (
                <p className="text-lg text-slate-600 mb-6">{project.short_description_en}</p>
              )}

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                {project.city && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">City</p>
                        <p className="font-semibold text-slate-900">{project.city.name_en}</p>
                      </div>
                    </div>
                  </div>
                )}
                {project.developer && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Developer</p>
                        <Link
                          href={`/developers/${project.developer.slug}`}
                          className="font-semibold text-slate-900 hover:text-[#1f261e]"
                        >
                          {project.developer.name_en}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                {project.price_from && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price From</p>
                        <p className="font-semibold text-slate-900">{project.price_from.toLocaleString()} EGP</p>
                      </div>
                    </div>
                  </div>
                )}
                {project.delivery_date && (
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Delivery</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(project.delivery_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {project.full_description_en && (
                <div className="prose prose-lg prose-slate mb-10 max-w-none">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About this project</h2>
                  <div dangerouslySetInnerHTML={{ __html: project.full_description_en }} />
                </div>
              )}

              {project.amenities && Array.isArray(project.amenities) && project.amenities.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                        <div className="h-3 w-3 rounded-full bg-[#1f261e]" />
                        <span className="font-medium text-slate-900">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Gallery</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((image, idx) => (
                      <div key={idx} className="relative h-64 overflow-hidden rounded-3xl bg-slate-100">
                        <Image
                          src={getImageUrl(image)}
                          alt={`${project.title_en} - Image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Project Summary</h3>

              <div className="space-y-4 divide-y divide-slate-200">
                {project.total_units && (
                  <div className="pb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Total Units</p>
                    <p className="text-lg font-semibold text-slate-900">{project.total_units}</p>
                  </div>
                )}
                {project.available_units !== undefined && (
                  <div className="pt-4 pb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Available Units</p>
                    <p className="text-lg font-semibold text-slate-900">{project.available_units}</p>
                  </div>
                )}
                {project.area_from && (
                  <div className="pt-4 pb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Area</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {project.area_from}
                      {project.area_to && ` - ${project.area_to}`} m²
                    </p>
                  </div>
                )}
                {project.bedrooms && (
                  <div className="pt-4 pb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Bedrooms</p>
                    <p className="text-lg font-semibold text-slate-900">{project.bedrooms}</p>
                  </div>
                )}
                {project.views_count !== undefined && (
                  <div className="pt-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Views</p>
                    <p className="text-lg font-semibold text-slate-900">{project.views_count}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Get More Information</h4>
              <button className="w-full rounded-2xl bg-[#1f261e] px-6 py-3 font-semibold text-[#ede5d8] hover:bg-[#333333] transition-colors">
                Request Info
              </button>
              <a
                href="tel:+201008982422"
                className="mt-3 block text-center rounded-2xl border-2 border-[#1f261e] px-6 py-3 font-semibold text-[#1f261e] hover:bg-slate-50 transition-colors"
              >
                Call us
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
