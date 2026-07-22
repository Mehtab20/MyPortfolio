import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const tabs = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'users', label: 'Users', icon: '👥' },
  { id: 'projects', label: 'Projects', icon: '💻' },
  { id: 'messages', label: 'Messages', icon: '✉️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const statsCards = [
  { label: 'Total Users', value: '0', change: 'Awaiting signups' },
  { label: 'Active Users', value: '0', change: 'Last 30 days' },
  { label: 'Projects', value: '0', change: 'Portfolio items' },
  { label: 'Messages', value: '0', change: 'Contact form' },
  { label: 'Revenue', value: '$0', change: 'Stripe pending', accent: true },
  { label: 'AI Credits', value: '0', change: 'Used this month' },
];

function OverviewTab({ profile }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat) => (
          <div key={stat.label} className="card-surface rounded-2xl p-5 golden-border">
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--theme-text-muted)' }}>
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.accent ? 'gradient-text' : ''}`} style={{ color: stat.accent ? undefined : 'var(--theme-text)' }}>
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>Platform Health</h2>
        <div className="space-y-3 text-sm">
          {[
            { label: 'Supabase Connection', status: 'Connected', ok: true },
            { label: 'Authentication', status: 'Active', ok: true },
            { label: 'AI Provider', status: 'Not configured', ok: false },
            { label: 'Stripe', status: 'Placeholder', ok: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--theme-border)' }}>
              <span style={{ color: 'var(--theme-text)' }}>{item.label}</span>
              <span className={`flex items-center gap-1.5 text-xs font-medium ${item.ok ? 'text-emerald-500' : 'text-amber-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.ok ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--theme-text)' }}>Quick Actions</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
          Common admin tasks — coming soon with Supabase integration
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Project', icon: '➕' },
            { label: 'New Blog Post', icon: '📝' },
            { label: 'Manage Skills', icon: '🎯' },
            { label: 'View Reports', icon: '📈' },
          ].map((action) => (
            <button
              key={action.label}
              className="p-3 rounded-xl text-center card-surface hover:border-primary/40 transition-all duration-300"
              disabled
            >
              <span className="text-lg">{action.icon}</span>
              <p className="text-xs mt-1 font-medium" style={{ color: 'var(--theme-text-secondary)' }}>{action.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--theme-border)' }}>
              {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="text-left py-3 px-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="text-center py-16">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(20, 184, 166, 0.08)' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--color-primary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>No users yet</p>
                <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Users appear here when they sign up.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesTab() {
  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>Contact Messages</h2>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--color-primary)' }}>
          0 unread
        </span>
      </div>
      <div className="text-center py-16">
        <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>No messages yet. Contact form submissions will appear here.</p>
      </div>
    </div>
  );
}

function SettingsTab({ profile }) {
  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>Admin Settings</h2>
      <div className="space-y-4 text-sm">
        {[
          { label: 'Admin', value: profile?.full_name || 'Admin User' },
          { label: 'Role', value: 'Admin', accent: true },
          { label: 'Platform Version', value: '1.0.0' },
          { label: 'Environment', value: import.meta.env.DEV ? 'Development' : 'Production' },
        ].map((item) => (
          <div key={item.label} className="flex justify-between py-3" style={{ borderBottom: '1px solid var(--theme-border)' }}>
            <span style={{ color: 'var(--theme-text-muted)' }}>{item.label}</span>
            <span className={`font-medium ${item.accent ? 'gradient-text' : ''}`} style={{ color: item.accent ? undefined : 'var(--theme-text)' }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Admin Panel
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Manage your platform content and users
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-1 rounded-xl card-surface golden-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id ? 'btn-primary' : ''
            }`}
            style={
              activeTab !== tab.id
                ? { color: 'var(--theme-text-secondary)', background: 'transparent' }
                : {}
            }
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab profile={profile} />}
      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'projects' && (
        <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border text-center py-12">
          <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Projects Management</p>
          <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Coming soon — CRUD for portfolio projects.</p>
        </div>
      )}
      {activeTab === 'messages' && <MessagesTab />}
      {activeTab === 'settings' && <SettingsTab profile={profile} />}
    </div>
  );
}
