import Link from 'next/link';
import Image from 'next/image';
import type { Blog } from '@/types';
import { Calendar, User } from 'lucide-react';
import { getImageUrl } from '@/utils/images';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group-hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={getImageUrl(blog.image)}
            alt={blog.title_en}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(blog.published_at)}</span>
            </div>
            {blog.author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{blog.author.name}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors">
            {blog.title_en}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {blog.excerpt_en}
          </p>
        </div>
      </div>
    </Link>
  );
}