export const API_URL =
  (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/+$/, '');

export function apiUrl(path: string) {
  return `${API_URL}/${path.replace(/^\/+/, '')}`;
}

export async function fetchApiData<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(apiUrl(path), { next: { revalidate: 60 } });
    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch (error) {
    console.error(`Failed to fetch ${path}`, error);
    return null;
  }
}

export async function fetchApiCollection<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(apiUrl(path), { next: { revalidate: 60 } });
    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    const data = json?.data?.data ?? json?.data;

    return Array.isArray(data) ? (data as T[]) : [];
  } catch (error) {
    console.error(`Failed to fetch ${path}`, error);
    return [];
  }
}
