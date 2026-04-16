import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';
import { MapPin, Bed, Bath, Maximize, Building } from 'lucide-react';
import { getImageUrl } from '@/utils/images';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatPrice = (price: number | undefined) => {
    if (!price) return 'Price on Request';
    if (price >= 1000000) {
      return `EGP ${(price / 1000000).toFixed(1)}M`;
    }
    return `EGP ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {project.cover_image ? (
          <Image
            src={getImageUrl(project.cover_image)}
            alt={project.title_en}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Building className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {project.is_featured && (
          <div className="absolute top-4 left-4 bg-gold-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
            Featured
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-gold-600 font-bold">
            {formatPrice(project.price_from)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {project.city?.name_en}, {project.area?.name_en}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {project.title_en}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.short_description_en}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {project.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{project.bedrooms} Beds</span>
            </div>
          )}
          {project.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{project.bathrooms} Baths</span>
            </div>
          )}
          {project.area_from && (
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{project.area_from} m²</span>
            </div>
          )}
        </div>

        {/* Project Type and Developer */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)} Projects
          </span>
          {project.developer && (
            <span className="text-sm text-gray-500">
              {project.developer.name_en}
            </span>
          )}
        </div>

        {/* Installment Info */}
        {project.installment_years && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Installments</span>
              <span className="font-semibold text-gray-900">
                {project.installment_years} Years
              </span>
            </div>
            {project.down_payment && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Down Payment</span>
                <span className="font-semibold text-gray-900">
                  {project.down_payment}%
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action */}
        <Link
          href={`/projects/${project.slug}`}
          className="block text-center bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-[#1f261e] transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}