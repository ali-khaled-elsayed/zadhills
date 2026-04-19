import Image from 'next/image';
import type { Blog } from '@/types';
import { Calendar, User } from 'lucide-react';
import { getImageUrl } from '@/utils/images';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${API_URL}/blogs/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load blog post');
  }
  const json = await res.json();
  return json.data as Blog;
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const blog = await fetchBlog(params.slug);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            {blog.image && (
              <div className="relative h-96 w-full">
                <Image
                  src={getImageUrl(blog.image)}
                  alt={blog.title_en}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-gray-600 mb-8">
                {/* <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No date'}</span>
                  </div>
                  {blog.author && (
                    <div className="flex items-center gap-3 text-sm">
                      <User className="w-4 h-4" />
                      <span>{blog.author.name}</span>
                    </div>
                  )}
                </div> */}

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Status</span>
                    <span className="font-semibold text-gray-900">{blog.status}</span>
                  </div>
                  {/* <div className="rounded-2xl bg-slate-100 p-3">
                    <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Views</span>
                    <span className="font-semibold text-gray-900">{blog.views_count ?? 0}</span>
                  </div> */}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {blog.title_en}
              </h1>
              {blog.excerpt_en && <p className="text-gray-600 text-lg mb-8">{blog.excerpt_en}</p>}

              {/* {blog.tags && blog.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-3">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#1f261e] px-4 py-2 text-sm text-[#ede5d8]">
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}

              {blog.content_en ? (
                <article className="prose prose-lg prose-slate max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: blog.content_en }} />
                </article>
              ) : (
                <p className="text-gray-600">No content available for this article.</p>
              )}

              <div className="mt-12 grid gap-4 sm:grid-cols-2 text-sm text-gray-500">
                {/* <div className="rounded-2xl bg-slate-100 p-4">
                  <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Slug</span>
                  <span className="font-medium text-gray-900">{blog.slug}</span>
                </div> */}
                <div className="rounded-2xl bg-slate-100 p-4">
                  <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Created</span>
                  <span className="font-medium text-gray-900">{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Updated</span>
                  <span className="font-medium text-gray-900">{new Date(blog.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                {/* <div className="rounded-2xl bg-slate-100 p-4">
                  <span className="block text-xs uppercase tracking-[0.2em] text-gray-400">Email</span>
                  <span className="font-medium text-gray-900">{blog.author?.email ?? '—'}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
