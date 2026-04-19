const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
const API_BASE_URL = API_URL.replace(/\/api\/?v1\/?$/, '').replace(/\/$/, '');

export function getImageUrl(imagePath?: string | null) {
  if (!imagePath) {
    return '/images/placeholder.png';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Handle API-relative paths
  if (imagePath.startsWith('/api/')) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // Handle static images directly from public directory
  if (imagePath.startsWith('/cities/') || imagePath.startsWith('/images/')) {
    return imagePath;
  }

  // Handle default/fallback images that don't exist
  if (imagePath.includes('default-city.avif') || imagePath.includes('placeholder')) {
    return '/cities/default-city.svg';
  }

  // For all other images, serve them from the API server's storage
  return `${API_BASE_URL}/storage/${imagePath.replace(/^\/+/, '')}`;
}
