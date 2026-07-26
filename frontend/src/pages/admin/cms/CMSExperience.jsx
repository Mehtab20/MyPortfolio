import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../../../api/cms';

export default function CMSExperience() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try { setItems(await getExperience() || []); } catch { toast.error('Failed to load'); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!edit?.title) { toast.error('Title required'); return; }
    try {
      if (edit.id) { await updateExperience(edit.id, edit); toast.success('Updated'); }
      else { await createExperience(edit); toast.success('Created'); }
      setEdit(null); load();
    } catch (err) { toast.error('Failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try { await deleteExperience(id); toast.success('Deleted'); load(); } catch (err) { toast.error('Delete failed'); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{items.length} entries</p>
        <button onClick={() => setEdit({ type: 'work', title: '', organization: '', period: '', description: '', highlights: [], sort_order: items.length })} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold cursor-pointer">+ Add Entry</button>
      </div>

      {edit && (
        <div className="card-surface rounded-2xl p-6 golden-border max-w-xl">
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{edit.id ? 'Edit' : 'New'} Entry</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Title</label>
                <input className={inputClass} style={inputStyle} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Type</label>
                <select className={inputClass} style={inputStyle} value={edit.type} onChange={(e) => setEdit({ ...edit, type: e.target.value })}>
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Organization</label>
              <input className={inputClass} style={inputStyle} value={edit.organization} onChange={(e) => setEdit({ ...edit, organization: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Period</label>
              <input className={inputClass} style={inputStyle} value={edit.period} onChange={(e) => setEdit({ ...edit, period: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Description</label>
              <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={2} value={edit.description} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Highlights (one per line)</label>
              <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={(edit.highlights || []).join('\n')} onChange={(e) => setEdit({ ...edit, highlights: e.target.value.split('\n').filter(Boolean) })} />
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
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'work' ? 'text-emerald-500' : 'text-cyan-500'}`} style={{ backgroundColor: item.type === 'work' ? 'rgba(16,185,129,0.1)' : 'rgba(6,182,212,0.1)' }}>{item.type === 'work' ? '💼 Work' : '🎓 Education'}</span>
              <h4 className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>{item.title}</h4>
              <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>{item.organization}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{item.period}</p>
            {item.description && <p className="text-xs mt-1" style={{ color: 'var(--theme-text-secondary)' }}>{item.description}</p>}
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
