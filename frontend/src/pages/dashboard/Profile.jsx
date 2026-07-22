import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getInitials } from '../../lib/utils';

export default function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSaved(false);
    try {
      await updateProfile({ full_name: fullName, bio });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--theme-text)' }}>
          Profile
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          Manage your personal information
        </p>
      </div>

      {/* Avatar Section */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <div className="flex items-center gap-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{
              backgroundColor: 'rgba(20, 184, 166, 0.15)',
              color: 'var(--color-primary)',
            }}
          >
            {getInitials(profile?.full_name || user?.email)}
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>
              {profile?.full_name || 'User'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              {user?.email}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
              Role: <span className="font-medium capitalize">{profile?.role || 'user'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--theme-text)' }}>
          Edit Profile
        </h2>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
            <p className="text-xs text-red-500 font-medium">{error}</p>
          </div>
        )}

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <p className="text-xs text-emerald-500 font-medium">Profile updated successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your full name"
          />
          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            disabled
            className="opacity-60 cursor-not-allowed"
          />
          <div className="space-y-1.5">
            <label
              className="block text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--theme-text-secondary)' }}
            >
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little about yourself..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50 resize-none"
              style={{
                backgroundColor: 'var(--theme-input-bg)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
          </div>

          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
        </form>
      </div>

      {/* Account Info */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--theme-text)' }}>
          Account Details
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>User ID</span>
            <span style={{ color: 'var(--theme-text)' }} className="font-mono text-xs">{user?.id}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Email Verified</span>
            <span style={{ color: user?.email_confirmed_at ? 'var(--color-primary)' : 'var(--theme-text-muted)' }}>
              {user?.email_confirmed_at ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--theme-text-muted)' }}>Last Sign In</span>
            <span style={{ color: 'var(--theme-text)' }}>
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
