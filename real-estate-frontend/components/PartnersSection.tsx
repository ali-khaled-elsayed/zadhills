import Image from 'next/image';
import type { Partner } from '@/types';
import { getImageUrl } from '@/utils/images';
import NoData from './NoData';

interface PartnersSectionProps {
  partners: Partner[];
}

const PartnersSection = ({ partners }: PartnersSectionProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We collaborate with the most trusted and reputable partners in the industry
          </p>
        </div>
        {partners.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="group flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-32 animate-scale-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Image
                  src={partner.logo ? getImageUrl(partner.logo) : '/images/placeholder-company.png'}
                  alt={partner.name_en}
                  width={120}
                  height={80}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
