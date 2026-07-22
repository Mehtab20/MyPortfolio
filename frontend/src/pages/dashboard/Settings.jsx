import { useState } from 'react';
import Button from '../../components/ui/Button';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    marketing: false,
    product: true,
  });
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Placeholder for saving settings to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Settings
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Configure your app preferences
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
          Notification Preferences
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
          Control how and when we send you notifications
        </p>

        <div className="space-y-4">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
            { key: 'marketing', label: 'Marketing Emails', description: 'Receive product updates and promotions' },
            { key: 'product', label: 'Product Updates', description: 'Get notified about new features and improvements' },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: '1px solid var(--theme-border)' }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                  notifications[item.key] ? 'bg-primary' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow ${
                    notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {saved && (
            <div className="mb-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-500 font-medium">Settings saved successfully!</p>
            </div>
          )}
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </div>

      {/* API Keys */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--theme-text)' }}>
          API Keys
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
          Manage your API keys for programmatic access
        </p>

        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: 'rgba(20, 184, 166, 0.05)', border: '1px dashed rgba(212, 165, 34, 0.3)' }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--theme-text-muted)' }}>
            API key management will be available on paid plans.
          </p>
          <Button variant="outline" size="sm" className="mt-3" href="/dashboard/subscription">
            Upgrade to Pro
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border border-red-500/20">
        <h2 className="text-lg font-bold mb-1" style={{ color: '#ef4444' }}>
          Danger Zone
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
          Irreversible actions — proceed with caution
        </p>

        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>
              Delete Account
            </p>
            <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
              Permanently delete your account and all associated data
            </p>
          </div>
          <Button variant="danger" size="sm" disabled>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
