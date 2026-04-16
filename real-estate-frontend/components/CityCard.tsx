import Link from 'next/link';
import Image from 'next/image';
import type { City } from '@/types';
import { Building2 } from 'lucide-react';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link href={`/cities/${city.slug}`} className="group block">
      <div className="relative h-48 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1">
        {city.image ? (
          <Image
            src={city.image}
            alt={city.name_en}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <Building2 className="w-16 h-16 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1">
            {city.name_en}
          </h3>
          <p className="text-white/80 text-sm">
            {city.projects_count || 0} Projects Available
          </p>
        </div>
      </div>
    </Link>
  );
}