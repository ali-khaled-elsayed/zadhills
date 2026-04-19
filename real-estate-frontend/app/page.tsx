import Image from 'next/image';
import type { Blog, City, Developer, Project, Partner } from '@/types';

// import { homePageContent } from '@/data/homeStaticData';
import ProjectCard from '../components/ProjectCard';
import SearchFilters from '../components/SearchFilters';
import AnimatedCard from '../components/AnimatedCard';
import CityCard from '../components/CityCard';
import PartnersSection from '../components/PartnersSection';
import BlogCard from '../components/BlogCard';
import ContactForm from '../components/ContactForm';
import { homePageContent } from '../data/homeStaticData';
import NoData from '@/components/NoData';
import { fetchApiCollection } from '@/utils/api';

async function getHomePageData() {
  const [featuredProjects, latestProjects, featuredCities, latestBlogs, partners] = await Promise.all([
    fetchApiCollection<Project>('/projects/featured?limit=6'),
    fetchApiCollection<Project>('/projects/latest?limit=6'),
    fetchApiCollection<City>('/cities/featured?limit=6'),
    fetchApiCollection<Blog>('/blogs/latest?limit=4'),
    fetchApiCollection<Partner>('/partners'),
  ]);

  return {
    featuredProjects,
    latestProjects,
    featuredCities,
    latestBlogs,
    partners,
  };
}

export default async function Home() {
  const { featuredProjects, latestProjects, featuredCities, latestBlogs, partners } = await getHomePageData();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative h-[680px] overflow-hidden bg-[#1f261e]">
        <img
          src={homePageContent.heroBackground}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-35 animate-fade-in"
        />
        <div className="absolute inset-0 bg-[#1f261e]/80" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-200 mb-4 animate-slide-down">
            Premium Real Estate Investment
          </p>
          <h1 className="text-4xl md:text-6xl font-bold max-w-4xl leading-tight animate-scale-bounce">
            <Image
              src="/logo.svg"
              alt="ZAD Hills Logo"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {homePageContent.heroSubtitle}
          </p>
          <div className="mt-12 w-full max-w-5xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <SearchFilters />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 container mx-auto px-4 bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">
            {homePageContent.featuredTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {homePageContent.featuredSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => (
              <AnimatedCard key={project.id} animation="scale-bounce" delay={index * 100}>
                <ProjectCard project={project} />
              </AnimatedCard>
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3">
              <NoData />
            </div>
          )}
        </div>
      </section>

      {/* Featured Cities */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">Popular Cities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Explore properties in the most sought-after locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCities.length > 0 ? (
              featuredCities.map((city, index) => (
                <AnimatedCard key={city.id} animation="slide-left" delay={index * 80}>
                  <CityCard city={city} />
                </AnimatedCard>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3">
                <NoData />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">
            {homePageContent.latestTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {homePageContent.latestSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProjects.length > 0 ? (
            latestProjects.map((project, index) => (
              <AnimatedCard key={project.id} animation="scale-bounce" delay={index * 100}>
                <ProjectCard project={project} />
              </AnimatedCard>
            ))
          ) : (
            <div className="md:col-span-2 lg:col-span-3">
              <NoData />
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection partners={partners} />

      {/* Latest Blogs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-slide-up">
              {homePageContent.blogTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {homePageContent.blogSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.length > 0 ? (
              latestBlogs.map((blog, index) => (
                <AnimatedCard key={blog.id} animation="slide-up" delay={index * 80}>
                  <BlogCard blog={blog} />
                </AnimatedCard>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-4">
                <NoData />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
    </main>
  );
}
