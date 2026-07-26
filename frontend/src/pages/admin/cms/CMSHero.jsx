import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getHero, saveHero } from '../../../api/cms';
import { supabase } from '../../../supabase';

const defaultHero = {
  first_name: 'Mehtab',
  last_name: 'Akbar',
  roles: ['Full-Stack Software Engineer'],
  tagline: '',
  stats: [],
  cta_buttons: [],
  available_status: true,
  profile_image: '',
};

export default function CMSHero() {
  const [data, setData] = useState(defaultHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roleInput, setRoleInput] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const result = await getHero();
        if (result) setData(result);
      } catch (err) {
        toast.error('Failed to load hero data');
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveHero(data);
      toast.success('Hero section updated!');
    } catch (err) {
      toast.error('Failed to save: ' + err.message);
    }
    setSaving(false);
  };

  const addRole = () => {
    if (!roleInput.trim()) return;
    setData((prev) => ({ ...prev, roles: [...(prev.roles || []), roleInput.trim()] }));
    setRoleInput('');
  };
  const removeRole = (index) => {
    setData((prev) => ({ ...prev, roles: prev.roles.filter((_, i) => i !== index) }));
  };

  const addStat = () => {
    setData((prev) => ({ ...prev, stats: [...(prev.stats || []), { value: '', label: '' }] }));
  };
  const updateStat = (index, field, value) => {
    const stats = [...(data.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    setData((prev) => ({ ...prev, stats }));
  };
  const removeStat = (index) => {
    setData((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  const addCTA = () => {
    setData((prev) => ({ ...prev, cta_buttons: [...(prev.cta_buttons || []), { label: '', href: '#', variant: 'primary' }] }));
  };
  const updateCTA = (index, field, value) => {
    const btns = [...(data.cta_buttons || [])];
    btns[index] = { ...btns[index], [field]: value };
    setData((prev) => ({ ...prev, cta_buttons: btns }));
  };
  const removeCTA = (index) => {
    setData((prev) => ({ ...prev, cta_buttons: prev.cta_buttons.filter((_, i) => i !== index) }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `hero/${Date.now()}_${file.name}`;
      const { data: upload, error } = await supabase.storage.from('cms-images').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('cms-images').getPublicUrl(upload.path);
      setData((prev) => ({ ...prev, profile_image: publicUrl }));
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="card-surface rounded-2xl p-8 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>Hero Section</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>First Name</label>
            <input className={inputClass} style={inputStyle} value={data.first_name || ''} onChange={(e) => setData((p) => ({ ...p, first_name: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Last Name</label>
            <input className={inputClass} style={inputStyle} value={data.last_name || ''} onChange={(e) => setData((p) => ({ ...p, last_name: e.target.value }))} />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Tagline</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={data.tagline || ''} onChange={(e) => setData((p) => ({ ...p, tagline: e.target.value }))} />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Profile Image</label>
          <div className="flex items-center gap-4">
            {data.profile_image && <img src={data.profile_image} alt="" className="w-16 h-16 rounded-full object-cover" />}
            <input type="file" accept="image/*" onChange={uploadImage} className="text-sm" style={{ color: 'var(--theme-text)' }} />
          </div>
          {data.profile_image && (
            <input className={inputClass + ' mt-2 font-mono text-xs'} style={inputStyle} value={data.profile_image} onChange={(e) => setData((p) => ({ ...p, profile_image: e.target.value }))} />
          )}
        </div>

        {/* Available Status */}
        <div className="flex items-center gap-3">
          <input type="checkbox" id="avail" checked={!!data.available_status} onChange={(e) => setData((p) => ({ ...p, available_status: e.target.checked }))} className="w-4 h-4 rounded" />
          <label htmlFor="avail" className="text-sm font-medium" style={{ color: 'var(--theme-text)' }}>Show "Available" status badge</label>
        </div>

        {/* Roles */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Roles (Typewriter)</label>
          <div className="flex gap-2 mb-2">
            <input className={inputClass + ' flex-1'} style={inputStyle} value={roleInput} onChange={(e) => setRoleInput(e.target.value)} placeholder="e.g. Full-Stack Engineer" onKeyDown={(e) => e.key === 'Enter' && addRole()} />
            <button onClick={addRole} className="px-4 py-2 rounded-xl btn-outline text-xs font-semibold cursor-pointer">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(data.roles || []).map((role, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(20,184,166,0.08)', color: 'var(--color-primary-light)', border: '1px solid rgba(20,184,166,0.18)' }}>
                {role}
                <button onClick={() => removeRole(i)} className="hover:text-red-400 cursor-pointer">&times;</button>
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Stats</label>
            <button onClick={addStat} className="text-xs text-primary hover:underline cursor-pointer">+ Add Stat</button>
          </div>
          <div className="space-y-2">
            {(data.stats || []).map((stat, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className={inputClass + ' w-24'} style={inputStyle} placeholder="Value" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
                <input className={inputClass + ' flex-1'} style={inputStyle} placeholder="Label" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
                <button onClick={() => removeStat(i)} className="p-2 text-red-400 hover:text-red-300 cursor-pointer">&times;</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>CTA Buttons</label>
            <button onClick={addCTA} className="text-xs text-primary hover:underline cursor-pointer">+ Add Button</button>
          </div>
          <div className="space-y-2">
            {(data.cta_buttons || []).map((btn, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input className={inputClass + ' w-28'} style={inputStyle} placeholder="Label" value={btn.label} onChange={(e) => updateCTA(i, 'label', e.target.value)} />
                <input className={inputClass + ' w-40'} style={inputStyle} placeholder="href" value={btn.href} onChange={(e) => updateCTA(i, 'href', e.target.value)} />
                <select className={inputClass + ' w-24'} style={inputStyle} value={btn.variant} onChange={(e) => updateCTA(i, 'variant', e.target.value)}>
                  <option value="primary">Primary</option>
                  <option value="outline">Outline</option>
                  <option value="ghost">Ghost</option>
                </select>
                <button onClick={() => removeCTA(i)} className="p-2 text-red-400 hover:text-red-300 cursor-pointer">&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
