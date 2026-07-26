import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../../../api/cms';

export default function CMSCertifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setItems(await getCertifications() || []); } catch { toast.error('Failed to load'); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!edit?.title) { toast.error('Title required'); return; }
    try {
      if (edit.id) { await updateCertification(edit.id, edit); toast.success('Updated'); }
      else { await createCertification(edit); toast.success('Created'); }
      setEdit(null); load();
    } catch (err) { toast.error('Failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await deleteCertification(id); toast.success('Deleted'); load(); } catch (err) { toast.error('Delete failed'); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{items.length} certifications</p>
        <button onClick={() => setEdit({ title: '', issuer: '', year: '', icon: '🏅', url: '', sort_order: items.length })} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold cursor-pointer">+ Add</button>
      </div>

      {edit && (
        <div className="card-surface rounded-2xl p-6 golden-border max-w-lg">
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{edit.id ? 'Edit' : 'New'} Certification</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Title</label>
              <input className={inputClass} style={inputStyle} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Issuer</label>
                <input className={inputClass} style={inputStyle} value={edit.issuer} onChange={(e) => setEdit({ ...edit, issuer: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Year</label>
                <input className={inputClass} style={inputStyle} value={edit.year} onChange={(e) => setEdit({ ...edit, year: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Icon (emoji)</label>
                <input className={inputClass} style={inputStyle} value={edit.icon} onChange={(e) => setEdit({ ...edit, icon: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>URL</label>
              <input className={inputClass} style={inputStyle} value={edit.url || ''} onChange={(e) => setEdit({ ...edit, url: e.target.value })} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer">Save</button>
              <button onClick={() => setEdit(null)} className="px-5 py-2 rounded-xl btn-ghost text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} className="card-surface rounded-xl p-5 golden-border-hover flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">{item.icon || '🏅'}</span>
            <div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>{item.title}</h4>
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>{item.issuer}</p>
              <span className="text-[10px] font-medium" style={{ color: 'var(--theme-text-muted)' }}>{item.year}</span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setEdit(item)} className="px-3 py-1.5 rounded-lg btn-outline text-xs cursor-pointer">Edit</button>
            <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 rounded-lg text-xs cursor-pointer" style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
