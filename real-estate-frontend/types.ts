export interface Author {
  id: number;
  name: string;
  email?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface City {
  id: number;
  slug: string;
  name_en: string;
  name_ar?: string;
  image?: string;
  description_en?: string;
  description_ar?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  projects_count?: number;
}

export interface Area {
  id: number;
  city_id?: number;
  slug?: string;
  name_en: string;
  name_ar?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DeveloperSocialMedia {
  [platform: string]: string;
}

export interface Developer {
  id: number;
  slug: string;
  name_en: string;
  name_ar?: string;
  logo?: string;
  description_en?: string;
  description_ar?: string;
  address_en?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  projects_count?: number;
  website?: string;
  email?: string;
  phone?: string;
  social_media?: DeveloperSocialMedia | null;
}

export interface Partner {
  id: number;
  name_en: string;
  name_ar?: string;
  logo?: string;
}

export interface Project {
  id: number;
  slug: string;
  title_en: string;
  title_ar?: string;
  short_description_en?: string;
  short_description_ar?: string;
  full_description_en?: string;
  full_description_ar?: string;
  cover_image?: string;
  project_type: string;
  status?: string;
  is_featured?: boolean;
  price_from?: number;
  price_to?: number;
  installment_years?: number;
  down_payment?: number;
  bedrooms?: number;
  bathrooms?: number;
  area_from?: number;
  area_to?: number;
  total_units?: number;
  available_units?: number;
  delivery_date?: string;
  location_map?: string;
  location_link?: string;
  latitude?: number;
  longitude?: number;
  unit_type?: string;
  floor_plans?: string[];
  meta?: any;
  created_at?: string;
  updated_at?: string;
  amenities?: string[];
  gallery?: string[];
  city?: City;
  area?: Area;
  developer?: Developer;
}

export interface Blog {
  id: number;
  slug: string;
  title_en: string;
  title_ar?: string;
  excerpt_en?: string;
  excerpt_ar?: string;
  full_description_en?: string;
  full_description_ar?: string;
  content_en?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
  };
}
