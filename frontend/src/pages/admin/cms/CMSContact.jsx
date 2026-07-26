import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getContact, saveContact } from '../../../api/cms';

export default function CMSContact() {
  const [data, setData] = useState({ email: '', phone: '', location: '', portfolio_url: '', social_links: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await getContact(); if (r) setData(r); } catch {}
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveContact(data); toast.success('Contact info updated!'); }
    catch (err) { toast.error('Failed: ' + err.message); }
    setSaving(false);
  };

  const addLink = () => setData((p) => ({ ...p, social_links: [...(p.social_links || []), { label: '', icon: '', url: '' }] }));
  const updateLink = (i, field, val) => {
    const links = [...(data.social_links || [])];
    links[i] = { ...links[i], [field]: val };
    setData((p) => ({ ...p, social_links: links }));
  };
  const removeLink = (i) => setData((p) => ({ ...p, social_links: p.social_links.filter((_, j) => j !== i) }));

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>Contact & Social Links</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="space-y-5 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Email</label>
            <input className={inputClass} style={inputStyle} value={data.email || ''} onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Phone</label>
            <input className={inputClass} style={inputStyle} value={data.phone || ''} onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Location</label>
          <input className={inputClass} style={inputStyle} value={data.location || ''} onChange={(e) => setData((p) => ({ ...p, location: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Portfolio URL</label>
          <input className={inputClass} style={inputStyle} value={data.portfolio_url || ''} onChange={(e) => setData((p) => ({ ...p, portfolio_url: e.target.value }))} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Social Links</label>
            <button onClick={addLink} className="text-xs text-primary hover:underline cursor-pointer">+ Add Link</button>
          </div>
          <div className="space-y-2">
            {(data.social_links || []).map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className={inputClass + ' w-20'} style={inputStyle} placeholder="Icon" value={link.icon} onChange={(e) => updateLink(i, 'icon', e.target.value)} />
                <input className={inputClass + ' w-28'} style={inputStyle} placeholder="Label" value={link.label} onChange={(e) => updateLink(i, 'label', e.target.value)} />
                <input className={inputClass + ' flex-1'} style={inputStyle} placeholder="URL" value={link.url} onChange={(e) => updateLink(i, 'url', e.target.value)} />
                <button onClick={() => removeLink(i)} className="p-2 text-red-400 hover:text-red-300 cursor-pointer">&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
