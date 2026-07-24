import { Portfolio } from '../types';
import { ALL_PORTFOLIOS } from '../data';

export { ALL_PORTFOLIOS };

export const CATEGORIES = [
  'All',
  'Frontend',
  'Full Stack',
  'Software Engineer',
  'AI / Data Science',
  'Mobile App Dev',
  'UI/UX & Design',
  'Backend & Cloud'
];

export const HOST_PLATFORMS = [
  'All',
  'Vercel',
  'Netlify',
  'Framer',
  'GitHub Pages',
  'Custom Domain',
  'is-a.dev'
];

export const POPULAR_TAGS = [
  'All',
  'React',
  'Next.js',
  'Vue',
  'Flutter',
  'Animated',
  'AI/ML',
  'TypeScript',
  'Senior',
  'Student',
  'Freelance'
];

export const ALPHABET = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function getScreenshotUrl(url: string, width: number = 1000): string {
  // WordPress mshots service provides fast, crisp website screenshots
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`;
}

export function getMicrolinkScreenshot(url: string): string {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;
}

export function getThumScreenshot(url: string, width: number = 800): string {
  const cleanUrl = url.replace(/^https?:\/\//, '');
  return `https://image.thum.io/get/width/${width}/crop/800/noanimate/https://${cleanUrl}`;
}

export function getScreenshotFallbackSources(url: string): string[] {
  return [
    getScreenshotUrl(url, 1000),
    getMicrolinkScreenshot(url),
    getThumScreenshot(url, 800)
  ];
}

export function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}

// LocalStorage helpers for Bookmarks
const BOOKMARKS_KEY = 'dev_portfolios_bookmarks_v1';
const RATINGS_KEY = 'dev_portfolios_ratings_v1';

export function getBookmarks(): number[] {
  try {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(id: number): number[] {
  const current = getBookmarks();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save bookmark', e);
  }
  return updated;
}

export function getRatings(): Record<number, { rating: number; notes: string }> {
  try {
    const saved = localStorage.getItem(RATINGS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveRating(id: number, rating: number, notes: string) {
  const current = getRatings();
  current[id] = { rating, notes };
  try {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save rating', e);
  }
  return current;
}
