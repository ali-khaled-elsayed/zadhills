const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const API_BASE_URL = API_URL.replace(/\/api\/?v1\/?$/, '').replace(/\/$/, '');

export function getImageUrl(imagePath?: string | null) {
  if (!imagePath) {
    return '/images/placeholder.png';
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Handle API-relative paths
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // Handle default/fallback images that don't exist
  if (imagePath.includes('default-city.avif') || imagePath.includes('placeholder')) {
    return '/cities/default-city.svg';
  }

  return `${API_BASE_URL}/${imagePath.replace(/^\/+/, '')}`;
}
