import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../lib/utils';

const quickActions = [
  {
    title: 'AI Chat',
    description: 'Have a conversation with our AI assistant',
    href: '/dashboard/chat',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: 'Subscription',
    description: 'Manage your plan and billing',
    href: '/dashboard/subscription',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: 'Profile',
    description: 'Update your personal information',
    href: '/dashboard/profile',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: 'Settings',
    description: 'Configure your app preferences',
    href: '/dashboard/settings',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const { user, profile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Welcome{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Here&apos;s an overview of your AI SaaS platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            AI Credits
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            100
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Remaining this month
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Plan
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            Free
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            <Link to="/dashboard/subscription" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
              Upgrade →
            </Link>
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Projects
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            0
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Created
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Member Since
          </p>
          <p className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>
            {formatDate(user?.created_at)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              to={action.href}
              className="group card-surface rounded-2xl p-5 golden-border-hover transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: 'rgba(212, 165, 34, 0.08)',
                  color: 'var(--color-primary)',
                }}
              >
                {action.icon}
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
                {action.title}
              </h3>
              <p className="text-xs" style={{ color: 'var(--theme-text-secondary)' }}>
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Recent Activity
        </h2>
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{ backgroundColor: 'rgba(212, 165, 34, 0.08)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--color-primary)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
            No recent activity
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Your activity and usage history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
