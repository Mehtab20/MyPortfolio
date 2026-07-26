import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAbout, saveAbout } from '../../../api/cms';

const defaultAbout = { bio_paragraphs: [''], personal_info: [], tagline: '' };

export default function CMSAbout() {
  const [data, setData] = useState(defaultAbout);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await getAbout();
        if (result) setData(result);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveAbout(data);
      toast.success('About section updated!');
    } catch (err) {
      toast.error('Failed to save: ' + err.message);
    }
    setSaving(false);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} /></div>;

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>About Section</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Tagline</label>
          <input className={inputClass} style={inputStyle} value={data.tagline || ''} onChange={(e) => setData((p) => ({ ...p, tagline: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Bio Paragraphs</label>
          {(data.bio_paragraphs || []).map((p, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={p} onChange={(e) => {
                const paras = [...(data.bio_paragraphs || [])];
                paras[i] = e.target.value;
                setData((prev) => ({ ...prev, bio_paragraphs: paras }));
              }} />
              <button onClick={() => {
                const paras = data.bio_paragraphs.filter((_, j) => j !== i);
                setData((prev) => ({ ...prev, bio_paragraphs: paras }));
              }} className="p-2 text-red-400 hover:text-red-300 cursor-pointer">&times;</button>
            </div>
          ))}
          <button onClick={() => setData((prev) => ({ ...prev, bio_paragraphs: [...(prev.bio_paragraphs || []), ''] }))} className="text-xs text-primary hover:underline cursor-pointer">+ Add Paragraph</button>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--theme-text-muted)' }}>Personal Info</label>
          <div className="grid grid-cols-2 gap-2">
            {(data.personal_info || []).map((info, i) => (
              <div key={i} className="flex gap-2 items-center card-surface p-2 rounded-xl">
                <input className={inputClass + ' w-24'} style={inputStyle} placeholder="Label" value={info.label} onChange={(e) => {
                  const items = [...data.personal_info];
                  items[i] = { ...items[i], label: e.target.value };
                  setData((prev) => ({ ...prev, personal_info: items }));
                }} />
                <input className={inputClass + ' flex-1'} style={inputStyle} placeholder="Value" value={info.value} onChange={(e) => {
                  const items = [...data.personal_info];
                  items[i] = { ...items[i], value: e.target.value };
                  setData((prev) => ({ ...prev, personal_info: items }));
                }} />
                <button onClick={() => setData((prev) => ({ ...prev, personal_info: prev.personal_info.filter((_, j) => j !== i) }))} className="p-1 text-red-400">&times;</button>
              </div>
            ))}
          </div>
          <button onClick={() => setData((prev) => ({ ...prev, personal_info: [...(prev.personal_info || []), { label: '', value: '' }] }))} className="text-xs text-primary hover:underline mt-2 cursor-pointer">+ Add Info</button>
        </div>
      </div>
    </div>
  );
}
