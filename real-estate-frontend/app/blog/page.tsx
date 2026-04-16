import type { Blog } from '@/types';
import BlogCard from '@/components/BlogCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(`${API_URL}/blogs`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load blogs');
  }
  const json = await res.json();
  return (json.data?.data ?? json.data) as Blog[];
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-20 bg-[#1f261e]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-[#ede5d8]/70 mb-4">Insights & updates</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#ede5d8] max-w-4xl mx-auto">Latest news from ZAD Hills</h1>
          <p className="mt-6 text-lg text-[#ede5d8]/80 max-w-3xl mx-auto">
            Explore our latest blog posts about real estate investment, market trends, and property guidance.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
