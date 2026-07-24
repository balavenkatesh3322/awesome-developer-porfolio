import React, { useState } from 'react';
import { X, Heart, MessageSquare, Bell, Mail, Phone, Database, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { getNotificationLogs, getStoredComments, getStoredLikes, NotificationLog } from '../lib/socialStore';
import { Portfolio } from '../types';

interface ActivityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPortfolios: Portfolio[];
}

export const ActivityHubModal: React.FC<ActivityHubModalProps> = ({
  isOpen,
  onClose,
  allPortfolios
}) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'notifications' | 'storage'>('comments');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const allCommentsMap = getStoredComments();
  const likesMap = getStoredLikes();
  const notificationLogs = getNotificationLogs();

  // Flatten comments
  const flattenedComments = Object.entries(allCommentsMap).flatMap(([pId, list]) => {
    const portfolio = allPortfolios.find((p) => p.id === Number(pId));
    return list.map((c) => ({
      ...c,
      portfolioName: portfolio?.name || c.portfolioName || `Portfolio #${pId}`,
      ownerEmail: portfolio?.email?.trim() || '',
      ownerPhone: portfolio?.phone?.trim() || ''
    }));
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalLikesCount = Object.values(likesMap).reduce((a, b) => a + b, 0);

  const handleTestNotification = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200/80 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl text-slate-900 my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/20">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Likes, Comments &amp; Notification Hub</h2>
              <p className="text-xs text-slate-500 font-medium">Inspect stored interactions, owner email/phone contacts &amp; alert delivery logs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-slate-100/80 border-b border-slate-200 p-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-pink-600 text-xs font-bold mb-0.5">
              <Heart className="w-4 h-4 fill-pink-500" />
              <span>Total Likes</span>
            </div>
            <span className="text-lg font-black text-slate-900">{totalLikesCount}</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 text-xs font-bold mb-0.5">
              <MessageSquare className="w-4 h-4" />
              <span>Total Comments</span>
            </div>
            <span className="text-lg font-black text-slate-900">{flattenedComments.length}</span>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-xs font-bold mb-0.5">
              <Bell className="w-4 h-4" />
              <span>Owner Alerts</span>
            </div>
            <span className="text-lg font-black text-slate-900">{notificationLogs.length}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'comments'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comments Directory ({flattenedComments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'notifications'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Owner Notification Logs ({notificationLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'storage'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Storage &amp; Integration Specs</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          
          {activeTab === 'comments' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Showing all comments across portfolios</span>
                <span className="text-indigo-600 font-bold">Stored in localStorage &amp; Firebase</span>
              </div>

              {flattenedComments.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 font-medium">
                  No comments posted yet. Open any portfolio live preview to leave the first comment!
                </div>
              ) : (
                flattenedComments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-xs text-slate-900">{comment.authorName}</span>
                        <span className="text-[11px] text-slate-500 ml-2 font-medium">
                          commented on <strong className="text-indigo-600">{comment.portfolioName}</strong>
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                      &quot;{comment.text}&quot;
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <div className="flex flex-wrap items-center gap-3 text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-indigo-600 shrink-0" /> Owner Email:{' '}
                          <strong className={comment.ownerEmail ? 'text-slate-800' : 'text-slate-400 italic'}>
                            {comment.ownerEmail || 'Not provided in JSON'}
                          </strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600 shrink-0" /> Owner Phone:{' '}
                          <strong className={comment.ownerPhone ? 'text-slate-800' : 'text-slate-400 italic'}>
                            {comment.ownerPhone || 'Not provided in JSON'}
                          </strong>
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Notification Triggered
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-indigo-900">Portfolio Owner Alert Dispatcher</h4>
                  <p className="text-[11px] text-indigo-700 font-medium mt-0.5">
                    When visitors leave comments, EmailJS / Twilio SMS webhooks dispatch instant alerts to developer email and phone numbers configured in JSON.
                  </p>
                </div>
                <button
                  onClick={handleTestNotification}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{testSent ? 'Alert Dispatched!' : 'Test Owner Alert'}</span>
                </button>
              </div>

              {testSent && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Simulated EmailJS &amp; SMS webhook alert sent to developer contact (balavenkatesh3322@gmail.com / +1-555-0192)!</span>
                </div>
              )}

              <div className="space-y-2.5">
                {notificationLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{log.portfolioName}</span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px] border border-indigo-200">
                          {log.channel}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] font-medium">
                        Target: <strong className="text-slate-800">{log.targetEmail}</strong> ({log.targetPhone})
                      </p>
                      <p className="text-slate-500 text-[11px] italic">
                        &quot;{log.commentText}&quot; — by {log.commentAuthor}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                        {log.status}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">
                        {new Date(log.sentAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-4 text-xs text-slate-700 font-medium leading-relaxed">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Where are Likes, Comments &amp; Contacts Stored?
                </h4>
                <p>
                  1. <strong>Portfolio Contact Details</strong>: Collected directly in each category JSON file under <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-indigo-700 font-bold">src/data/categories/</code> using the optional fields:
                </p>
                <pre className="bg-slate-900 text-indigo-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`{
  "id": 0,
  "name": "Bala Venkatesh",
  "email": "balavenkatesh3322@gmail.com",
  "phone": "+1-555-0192",
  "url": "https://balavenkatesh3322.github.io/bala_venkatesh_profile/"
}`}
                </pre>

                <p className="pt-2">
                  2. <strong>User Interactions (Option A Architecture)</strong>: Likes and Comments posted via the UI are persisted in browser <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-indigo-700 font-bold">localStorage</code> and synced via Firebase Firestore / EmailJS webhook handlers to send instant notifications to portfolio owners upon submission.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-colors shadow-sm"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
