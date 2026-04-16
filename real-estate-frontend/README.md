# Real Estate Platform - Next.js Frontend

A modern, production-ready real estate frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Server-Side Rendering (SSR)**: SEO-optimized pages with Next.js App Router
- **Multi-language Support**: English and Arabic (RTL) ready
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Advanced Search**: Filter properties by location, price, type, and more
- **Property Comparison**: Compare multiple properties side by side
- **Lead Capture**: Integrated contact and inquiry forms
- **Image Optimization**: Next.js Image component for optimal performance

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Forms**: React Hook Form

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Laravel API backend running on `http://localhost:8000`

### Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Real Estate Platform"
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── projects/           # Projects listing page
│   ├── projects/
│   │   └── [slug]/         # Project detail page
│   ├── cities/             # Cities listing
│   ├── cities/
│   │   └── [slug]/         # City detail page
│   ├── developers/         # Developers listing
│   ├── developers/
│   │   └── [slug]/         # Developer detail page
│   ├── blog/               # Blog listing
│   ├── blog/
│   │   └── [slug]/         # Blog detail page
│   └── contact/            # Contact page
├── components/
│   ├── ProjectCard.tsx     # Project card component
│   ├── CityCard.tsx        # City card component
│   ├── BlogCard.tsx        # Blog card component
│   ├── SearchFilters.tsx   # Search filter component
│   ├── Header.tsx          # Header navigation
│   ├── Footer.tsx          # Footer
│   └── ...
├── services/
│   └── api.ts              # API service layer
├── types/
│   └── index.ts            # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
└── public/                 # Static assets
```

## API Integration

The frontend communicates with the Laravel API through the service layer in `services/api.ts`.

### Available API Methods

```typescript
// Projects
projectApi.getAll(perPage)
projectApi.getFeatured(limit)
projectApi.getLatest(limit)
projectApi.search(filters, perPage)
projectApi.getBySlug(slug)
projectApi.getSimilar(id, limit)
projectApi.compare(ids)

// Cities
cityApi.getAll()
cityApi.getFeatured(limit)
cityApi.getBySlug(slug)

// Developers
developerApi.getAll(perPage)
developerApi.getFeatured(limit)
developerApi.getBySlug(slug)

// Blogs
blogApi.getAll(perPage)
blogApi.getLatest(limit)
blogApi.search(search, perPage)
blogApi.getBySlug(slug)
blogApi.getByTag(tag, perPage)

// Contact & Leads
leadApi.create(data)
contactApi.sendMessage(data)
```

## Styling

The application uses Tailwind CSS with custom theme extensions:

### Custom Colors
- `gold-*`: Premium gold accent colors
- `green-*`: Green accent colors
- `primary-*`: Gray scale colors

### Custom Shadows
- `shadow-card`: Standard card shadow
- `shadow-card-hover`: Hover state shadow
- `shadow-premium`: Premium/large shadow

## Multi-language Support

The application is ready for multi-language support:

1. **Font Setup**: Inter for English, Noto Sans Arabic for Arabic
2. **RTL Support**: CSS classes for RTL layout
3. **Locale Detection**: Based on URL or user preference

## SEO Optimization

- Server-side rendering for all pages
- Dynamic meta tags for each page
- OpenGraph tags for social sharing
- Structured data for rich snippets
- XML sitemap generation

## Performance

- Image optimization with Next.js Image
- Lazy loading for components
- Code splitting by route
- CSS purging with Tailwind

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - All rights reserved.