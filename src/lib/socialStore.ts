import { CommentItem, SocialDataState } from '../types';

const LIKES_KEY = 'awesome_portfolios_likes_v1';
const USER_LIKES_KEY = 'awesome_portfolios_user_likes_v1';
const COMMENTS_KEY = 'awesome_portfolios_comments_v1';
const NOTIFICATIONS_LOG_KEY = 'awesome_portfolios_notifications_v1';

export interface NotificationLog {
  id: string;
  portfolioId: number;
  portfolioName: string;
  targetEmail?: string;
  targetPhone?: string;
  commentAuthor: string;
  commentText: string;
  sentAt: string;
  channel: 'EmailJS' | 'Twilio SMS' | 'Webhook';
  status: 'Delivered (Simulated)' | 'Pending';
}

// Initial seed comments for top showcase portfolios
const SEED_COMMENTS: Record<number, CommentItem[]> = {
  0: [
    {
      id: 'seed-1',
      portfolioId: 0,
      portfolioName: 'Bala Venkatesh',
      authorName: 'Sarah Jenkins',
      authorEmail: 'sarah.j@techlead.io',
      text: 'Incredible portfolio design! Love the high-performance AI showcases and clean dark mode layout.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      notified: true
    },
    {
      id: 'seed-2',
      portfolioId: 0,
      portfolioName: 'Bala Venkatesh',
      authorName: 'Marcus Chen',
      authorEmail: 'marcus.chen@dev.net',
      text: 'Very sleek UI! The live iframe preview integration is super useful for exploring developer work.',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      notified: true
    }
  ]
};

// Initial seed likes
const SEED_LIKES: Record<number, number> = {
  0: 142,
  2: 89,
  3: 67,
  5: 112,
  7: 94
};

export const getStoredLikes = (): Record<number, number> => {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    if (!raw) return SEED_LIKES;
    return { ...SEED_LIKES, ...JSON.parse(raw) };
  } catch {
    return SEED_LIKES;
  }
};

export const getStoredUserLikes = (): Record<number, boolean> => {
  try {
    const raw = localStorage.getItem(USER_LIKES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getStoredComments = (): Record<number, CommentItem[]> => {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) return SEED_COMMENTS;
    return { ...SEED_COMMENTS, ...JSON.parse(raw) };
  } catch {
    return SEED_COMMENTS;
  }
};

export const getNotificationLogs = (): NotificationLog[] => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_LOG_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: 'notif-1',
        portfolioId: 0,
        portfolioName: 'Bala Venkatesh',
        targetEmail: 'balavenkatesh3322@gmail.com',
        targetPhone: '+1-555-0192',
        commentAuthor: 'Sarah Jenkins',
        commentText: 'Incredible portfolio design! Love the high-performance AI showcases...',
        sentAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        channel: 'EmailJS',
        status: 'Delivered (Simulated)'
      }
    ];
  } catch {
    return [];
  }
};

export const getSocialData = (): SocialDataState => {
  return {
    likes: getStoredLikes(),
    userLikes: getStoredUserLikes(),
    comments: getStoredComments()
  };
};

export const toggleLike = (portfolioId: number): SocialDataState => {
  togglePortfolioLike(portfolioId);
  return getSocialData();
};

export const addComment = (
  portfolioId: number,
  authorName: string,
  authorEmail: string,
  text: string,
  portfolioOwnerEmail?: string,
  portfolioOwnerPhone?: string
): SocialDataState => {
  addPortfolioComment(
    portfolioId,
    `Portfolio #${portfolioId}`,
    authorName,
    authorEmail,
    text,
    portfolioOwnerEmail,
    portfolioOwnerPhone
  );
  return getSocialData();
};
export const togglePortfolioLike = (
  portfolioId: number
): { isLiked: boolean; newCount: number } => {
  const currentLikes = getStoredLikes();
  const currentUserLikes = getStoredUserLikes();

  const isCurrentlyLiked = !!currentUserLikes[portfolioId];
  const currentCount = currentLikes[portfolioId] || 0;

  const newLikedState = !isCurrentlyLiked;
  const newCount = newLikedState ? currentCount + 1 : Math.max(0, currentCount - 1);

  currentLikes[portfolioId] = newCount;
  currentUserLikes[portfolioId] = newLikedState;

  localStorage.setItem(LIKES_KEY, JSON.stringify(currentLikes));
  localStorage.setItem(USER_LIKES_KEY, JSON.stringify(currentUserLikes));

  return { isLiked: newLikedState, newCount };
};

export const addPortfolioComment = (
  portfolioId: number,
  portfolioName: string,
  authorName: string,
  authorEmail: string,
  text: string,
  portfolioOwnerEmail?: string,
  portfolioOwnerPhone?: string
): { newComments: CommentItem[]; notification: NotificationLog } => {
  const allComments = getStoredComments();
  const portfolioComments = allComments[portfolioId] || [];

  const newComment: CommentItem = {
    id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    portfolioId,
    portfolioName,
    authorName: authorName.trim() || 'Anonymous Developer',
    authorEmail: authorEmail.trim(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    notified: true
  };

  const updatedPortfolioComments = [newComment, ...portfolioComments];
  allComments[portfolioId] = updatedPortfolioComments;
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));

  // Log Notification to Owner
  const notification: NotificationLog = {
    id: `notif-${Date.now()}`,
    portfolioId,
    portfolioName,
    targetEmail: portfolioOwnerEmail?.trim() || 'Not provided in JSON',
    targetPhone: portfolioOwnerPhone?.trim() || 'Not provided in JSON',
    commentAuthor: newComment.authorName,
    commentText: newComment.text,
    sentAt: newComment.createdAt,
    channel: portfolioOwnerEmail ? 'EmailJS' : 'Webhook',
    status: 'Delivered (Simulated)'
  };

  const logs = getNotificationLogs();
  const updatedLogs = [notification, ...logs];
  localStorage.setItem(NOTIFICATIONS_LOG_KEY, JSON.stringify(updatedLogs));

  return { newComments: updatedPortfolioComments, notification };
};
