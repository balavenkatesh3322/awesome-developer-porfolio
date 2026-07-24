export interface Portfolio {
  id: number;
  name: string;
  url: string;
  role: string;
  hostPlatform: string;
  category: string;
  tags: string[];
  initials: string;
  firstLetter: string;
  featured?: boolean;
  email?: string;
  phone?: string;
  likesCount?: number;
  commentsCount?: number;
}

export interface CommentItem {
  id: string;
  portfolioId: number;
  authorName: string;
  authorEmail?: string;
  text: string;
  createdAt: string;
  notified?: boolean;
  portfolioName?: string;
}

export interface SocialDataState {
  likes: Record<number, number>; // portfolioId -> total count
  userLikes: Record<number, boolean>; // portfolioId -> true if user liked
  comments: Record<number, CommentItem[]>; // portfolioId -> array of comments
}

export type ViewMode = 'grid' | 'compact' | 'table';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface UserRating {
  portfolioId: number;
  rating: number; // 1-5
  notes: string;
  savedAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  platform: string;
  tag: string;
  letter: string;
  sortBy: 'featured' | 'name-asc' | 'name-desc' | 'random';
  onlyBookmarks: boolean;
}
