import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSEO, saveSEO } from '../../../api/cms';

export default function CMSSEO() {
  const [data, setData] = useState({ site_title: '', site_description: '', og_image: '', keywords: '', google_analytics_id: '', favicon: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await getSEO(); if (r) setData(r); } catch {}
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveSEO(data); toast.success('SEO settings saved!'); }
    catch (err) { toast.error('Failed: ' + err.message); }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>SEO Metadata</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="space-y-5 max-w-xl">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Site Title</label>
          <input className={inputClass} style={inputStyle} value={data.site_title || ''} onChange={(e) => setData((p) => ({ ...p, site_title: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Site Description</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={data.site_description || ''} onChange={(e) => setData((p) => ({ ...p, site_description: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Keywords</label>
          <input className={inputClass} style={inputStyle} value={data.keywords || ''} onChange={(e) => setData((p) => ({ ...p, keywords: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>OG Image URL</label>
          <input className={inputClass} style={inputStyle} value={data.og_image || ''} onChange={(e) => setData((p) => ({ ...p, og_image: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Google Analytics ID</label>
          <input className={inputClass} style={inputStyle} value={data.google_analytics_id || ''} onChange={(e) => setData((p) => ({ ...p, google_analytics_id: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Favicon Path</label>
          <input className={inputClass} style={inputStyle} value={data.favicon || ''} onChange={(e) => setData((p) => ({ ...p, favicon: e.target.value }))} />
        </div>
      </div>
    </div>
  );
}
