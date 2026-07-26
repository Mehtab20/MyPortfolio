import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSettings, saveSettings } from '../../../api/cms';

export default function CMSSettings() {
  const [data, setData] = useState({ site_name: '', enable_animations: true, enable_blog: true, enable_contact_form: true, maintenance_mode: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await getSettings(); if (r) setData(r); } catch {}
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveSettings(data); toast.success('Settings saved!'); }
    catch (err) { toast.error('Failed: ' + err.message); }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>Site Settings</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="space-y-5 max-w-lg">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Site Name</label>
          <input className={inputClass} style={inputStyle} value={data.site_name || ''} onChange={(e) => setData((p) => ({ ...p, site_name: e.target.value }))} />
        </div>
        <div className="space-y-3">
          {[
            { key: 'enable_animations', label: 'Enable animations' },
            { key: 'enable_blog', label: 'Enable blog section' },
            { key: 'enable_contact_form', label: 'Enable contact form' },
            { key: 'maintenance_mode', label: 'Maintenance mode (hide everything)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={!!data[key]} onChange={(e) => setData((p) => ({ ...p, [key]: e.target.checked }))} className="w-4 h-4 rounded" />
              <span className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
