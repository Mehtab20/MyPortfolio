import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Manage your platform — only visible to admin users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Total Users
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            0
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Registered accounts
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Active Users
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            0
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Last 30 days
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            Revenue
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            $0
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Stripe integration pending
          </p>
        </div>
        <div className="card-surface rounded-2xl p-5 golden-border">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
            AI Credits Used
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--theme-text)' }}>
            0
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Across all users
          </p>
        </div>
      </div>

      {/* Users Table Placeholder */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          User Management
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
                <th className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>User</th>
                <th className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Email</th>
                <th className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Role</th>
                <th className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Status</th>
                <th className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'rgba(212, 165, 34, 0.08)' }}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--color-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                    No users yet
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
                    User data will appear here once people sign up.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Info */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Admin Information
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Admin</span>
            <span style={{ color: 'var(--theme-text)' }}>{profile?.full_name || 'Admin User'}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Role</span>
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>Admin</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Platform Status</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span style={{ color: 'var(--theme-text)' }}>Operational</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Version</span>
            <span style={{ color: 'var(--theme-text)' }}>1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
