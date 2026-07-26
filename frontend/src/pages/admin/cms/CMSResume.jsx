import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getResumeData, saveResumeData } from '../../../api/cms';
import { supabase } from '../../../supabase';

export default function CMSResume() {
  const [data, setData] = useState({ pdf_url: '', sections: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try { const r = await getResumeData(); if (r) setData(r); } catch {}
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await saveResumeData(data); toast.success('Resume updated!'); }
    catch (err) { toast.error('Failed: ' + err.message); }
    setSaving(false);
  };

  const uploadPDF = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `resume/${Date.now()}_${file.name}`;
      const { data: upload, error } = await supabase.storage.from('cms-images').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('cms-images').getPublicUrl(upload.path);
      setData((p) => ({ ...p, pdf_url: publicUrl }));
      toast.success('PDF uploaded!');
    } catch (err) { toast.error('Upload failed: ' + err.message); }
  };

  const addSection = () => setData((p) => ({ ...p, sections: [...(p.sections || []), { title: '', content: '', items: [] }] }));
  const updateSection = (i, field, val) => {
    const s = [...(data.sections || [])];
    s[i] = { ...s[i], [field]: val };
    setData((p) => ({ ...p, sections: s }));
  };
  const removeSection = (i) => setData((p) => ({ ...p, sections: p.sections.filter((_, j) => j !== i) }));

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="card-surface rounded-2xl p-6 sm:p-8 golden-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>Resume</h2>
        <button onClick={handleSave} disabled={saving} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
      </div>
      <div className="space-y-6 max-w-xl">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Resume PDF</label>
          <div className="flex items-center gap-3">
            {data.pdf_url && <a href={data.pdf_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">View Current PDF</a>}
            <input type="file" accept=".pdf" onChange={uploadPDF} className="text-sm" style={{ color: 'var(--theme-text)' }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>Resume Sections</label>
            <button onClick={addSection} className="text-xs text-primary hover:underline cursor-pointer">+ Add Section</button>
          </div>
          <div className="space-y-4">
            {(data.sections || []).map((sec, i) => (
              <div key={i} className="card-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <input className={inputClass + ' font-bold'} style={inputStyle} placeholder="Section Title" value={sec.title} onChange={(e) => updateSection(i, 'title', e.target.value)} />
                  <button onClick={() => removeSection(i)} className="p-1 text-red-400 cursor-pointer">&times;</button>
                </div>
                <textarea className={inputClass + ' resize-none font-mono text-xs'} style={inputStyle} rows={4} value={JSON.stringify(sec.items, null, 2)} placeholder='["Item 1", "Item 2"]' onChange={(e) => {
                  try { updateSection(i, 'items', JSON.parse(e.target.value)); } catch {}
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
