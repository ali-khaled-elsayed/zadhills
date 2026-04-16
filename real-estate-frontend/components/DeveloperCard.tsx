import Link from 'next/link';
import Image from 'next/image';
import type { Developer } from '@/types';
import { getImageUrl } from '@/utils/images';

interface DeveloperCardProps {
  developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  return (
    <Link
      href={`/developers/${developer.slug}`}
      className="group block rounded-3xl border border-slate-200 bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex h-full flex-col justify-between p-6">
        <div>
          <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={getImageUrl(developer.logo)}
              alt={developer.name_en}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="text-2xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#1f261e]">
            {developer.name_en}
          </h3>

          {developer.description_en ? (
            <p className="text-sm leading-6 text-slate-600 line-clamp-3">
              {developer.description_en}
            </p>
          ) : (
            <p className="text-sm leading-6 text-slate-600">Trusted developer with premium projects.</p>
          )}
        </div>

        <div className="mt-6 space-y-3 text-sm text-slate-500">
          {developer.projects_count !== undefined && (
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-semibold text-slate-900">{developer.projects_count}</span>
              <span className="ml-2">Projects</span>
            </div>
          )}
          {developer.website && (
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <span className="font-semibold text-slate-900">Website:</span>
              <a href={developer.website} target="_blank" rel="noreferrer" className="ml-2 text-sky-600 hover:text-sky-800">
                Visit
              </a>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
