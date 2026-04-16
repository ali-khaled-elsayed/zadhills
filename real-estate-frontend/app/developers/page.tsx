import type { Developer } from '@/types';
import DeveloperCard from '@/components/DeveloperCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchDevelopers(): Promise<Developer[]> {
  const res = await fetch(`${API_URL}/developers?per_page=100`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load developers');
  }
  const json = await res.json();
  return (json.data?.data ?? json.data) as Developer[];
}

export default async function DevelopersPage() {
  const developers = await fetchDevelopers();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-[#1f261e] py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-[#ede5d8]/70 mb-4">Trusted partners</p>
          <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto">Leading real estate developers in Egypt</h1>
          <p className="mt-6 text-lg text-[#ede5d8]/80 max-w-3xl mx-auto">
            Explore our curated selection of developer brands, their signature projects, and the teams building your next investment.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Developers</p>
            <h2 className="text-3xl font-bold text-slate-900">Browse by developer</h2>
          </div>
          {/* <p className="max-w-xl text-sm leading-7 text-slate-600">
            Click a developer to view their profile, projects, contact details, and company overview.
          </p> */}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {developers.map((developer) => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      </section>
    </main>
  );
}
