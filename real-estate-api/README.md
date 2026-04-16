# Real Estate Platform - Laravel API

A production-ready real estate investment platform built with Laravel 11, Filament v3, and Next.js.

## Features

- **Property Management**: Browse, search, and filter real estate projects
- **Multi-language Support**: English and Arabic (EN/AR)
- **Advanced Search**: Filter by city, area, price, type, and more
- **Lead Management**: Capture and manage customer inquiries
- **Blog/News**: Content management system
- **Admin Dashboard**: Filament v3 admin panel with analytics
- **REST API**: Complete API for frontend integration
- **Role & Permission Management**: Spatie Laravel Permission
- **Authentication**: Laravel Sanctum API authentication

## Tech Stack

- **Backend**: Laravel 11
- **Admin Panel**: Filament v3
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **Permissions**: Spatie Laravel Permission
- **Frontend**: Next.js 14+ (separate repository)

## Installation

### Prerequisites

- PHP 8.2+
- Composer
- MySQL 8.0+ or MariaDB
- Node.js 18+ (for frontend)

### Backend Setup

1. **Clone the repository**
```bash
cd real-estate-api
```

2. **Install dependencies**
```bash
composer install
```

3. **Configure environment**
```bash
cp .env.example .env
php artisan key:generate
```

4. **Update database configuration in .env**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=real_estate_platform
DB_USERNAME=root
DB_PASSWORD=
```

5. **Run migrations**
```bash
php artisan migrate
```

6. **Install Filament**
```bash
php artisan filament:install --panels
```

7. **Create admin user**
```bash
php artisan make:filament-user
```

8. **Start development server**
```bash
php artisan serve
```

### Admin Panel Access

- URL: `http://localhost:8000/admin`
- Login with the credentials created in step 7

### API Documentation

Base URL: `http://localhost:8000/api/v1`

#### Endpoints

**Projects**
- `GET /projects` - List all projects
- `GET /projects/featured` - Featured projects
- `GET /projects/latest` - Latest projects
- `GET /projects/search` - Search with filters
- `GET /projects/{slug}` - Project details
- `GET /projects/{id}/similar` - Similar projects
- `POST /projects/compare` - Compare projects

**Cities**
- `GET /cities` - List all cities
- `GET /cities/featured` - Featured cities
- `GET /cities/{slug}` - City details with projects

**Developers**
- `GET /developers` - List all developers
- `GET /developers/featured` - Featured developers
- `GET /developers/{slug}` - Developer details with projects

**Blogs**
- `GET /blogs` - List all blogs
- `GET /blogs/latest` - Latest blogs
- `GET /blogs/search` - Search blogs
- `GET /blogs/{slug}` - Blog details

**Contact & Leads**
- `POST /contact` - Submit contact form
- `POST /leads` - Submit lead form

## Project Structure

```
app/
├── Http/
│   └── Controllers/
│       └── Api/           # API Controllers
├── Models/                # Eloquent Models
├── Repositories/          # Data Repositories
├── Services/              # Business Logic Services
├── Interfaces/            # Repository Interfaces
└── Providers/
    └── Filament/          # Filament Admin Panel
database/
├── migrations/            # Database Migrations
├── factories/             # Model Factories
└── seeders/               # Database Seeders
routes/
└── api.php                # API Routes
```

## Database Schema

### Main Tables

- **users** - Admin and staff users
- **cities** - Cities/regions
- **areas** - Areas within cities
- **developers** - Property developers
- **projects** - Real estate projects
- **project_images** - Project image gallery
- **project_features** - Project amenities/features
- **blogs** - Blog posts/news
- **leads** - Customer inquiries
- **contact_messages** - Contact form submissions

## API Response Format

All API responses follow a consistent format:

```json
{
    "success": true,
    "data": { ... },
    "message": "Optional message"
}
```

## Search Filters

Projects can be filtered by:
- `city_id` - Filter by city
- `area_id` - Filter by area
- `developer_id` - Filter by developer
- `project_type` - residential, commercial, etc.
- `unit_type` - apartment, villa, etc.
- `price_from` - Minimum price
- `price_to` - Maximum price
- `installment_years` - Installment duration
- `delivery_date` - Completion date
- `bedrooms` - Number of bedrooms
- `search` - Text search in title

## Multi-language Support

The application supports English and Arabic:
- Set locale via `Accept-Language` header
- Models have `name_en`, `name_ar` fields
- Accessors automatically return based on locale

## Development

### Running Tests
```bash
php artisan test
```

### Clear Caches
```bash
php artisan optimize:clear
```

### Create Service Provider
```bash
php artisan make:provider RepositoryServiceProvider
```

## Security

- API authentication via Laravel Sanctum
- Role-based access control with Spatie Permissions
- CORS configuration for frontend access
- Input validation and sanitization

## Deployment

### Production Recommendations

1. Set `APP_ENV=production` and `APP_DEBUG=false`
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Configure proper CORS settings
5. Set up caching (Redis/Memcached)
6. Use queue workers for background jobs
7. Monitor with Laravel Telescope/Horizon

## License

Proprietary - All rights reserved.

## Support

For support, contact the development team.
