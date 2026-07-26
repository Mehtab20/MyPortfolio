import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../../api/cms';

export default function CMSSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null); // null | { id?, category, category_key, context, icon, skills, sort_order }

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const data = await getSkills();
      setSkills(data || []);
    } catch { toast.error('Failed to load skills'); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!edit.category || !edit.category_key) { toast.error('Category and key required'); return; }
    try {
      if (edit.id) {
        await updateSkill(edit.id, { category: edit.category, category_key: edit.category_key, context: edit.context, icon: edit.icon, skills: edit.skills, sort_order: edit.sort_order || 0 });
        toast.success('Skill updated');
      } else {
        await createSkill({ category: edit.category, category_key: edit.category_key, context: edit.context, icon: edit.icon, skills: edit.skills || [], sort_order: skills.length });
        toast.success('Skill created');
      }
      setEdit(null);
      load();
    } catch (err) { toast.error('Failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill category?')) return;
    try { await deleteSkill(id); toast.success('Deleted'); load(); }
    catch (err) { toast.error('Delete failed: ' + err.message); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} /></div>;

  return (
    <div className="space-y-6">
      {edit && (
        <div className="card-surface rounded-2xl p-6 golden-border">
          <h3 className="text-base font-bold mb-4" style={{ color: 'var(--theme-text)' }}>{edit.id ? 'Edit' : 'New'} Skill Category</h3>
          <div className="space-y-4 max-w-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Category</label>
                <input className={inputClass} style={inputStyle} value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Key (slug)</label>
                <input className={inputClass} style={inputStyle} value={edit.category_key} onChange={(e) => setEdit({ ...edit, category_key: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Context</label>
              <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={2} value={edit.context} onChange={(e) => setEdit({ ...edit, context: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Skills (JSON array of {name, icon})</label>
              <textarea className={inputClass + ' resize-none font-mono text-xs'} style={inputStyle} rows={4} value={JSON.stringify(edit.skills, null, 2)} onChange={(e) => {
                try { setEdit({ ...edit, skills: JSON.parse(e.target.value) }); } catch { /* allow editing */ }
              }} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSave} className="px-5 py-2 rounded-xl btn-primary text-sm font-semibold cursor-pointer">Save</button>
              <button onClick={() => setEdit(null)} className="px-5 py-2 rounded-xl btn-ghost text-sm cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{skills.length} skill categories</p>
        <button onClick={() => setEdit({ category: '', category_key: '', context: '', icon: '⚡', skills: [{ name: '', icon: '' }], sort_order: skills.length })} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold cursor-pointer">+ New Category</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="card-surface rounded-xl p-5 golden-border-hover flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{skill.icon || '⚡'}</span>
                <h4 className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>{skill.category}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(20,184,166,0.08)', color: 'var(--color-primary-light)' }}>{skill.category_key}</span>
              </div>
              {skill.context && <p className="text-xs mb-2" style={{ color: 'var(--theme-text-muted)' }}>{skill.context}</p>}
              <div className="flex flex-wrap gap-1.5">
                {(skill.skills || []).map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px]" style={{ backgroundColor: 'rgba(20,184,166,0.06)', color: 'var(--color-primary-light)', border: '1px solid rgba(20,184,166,0.12)' }}>
                    {s.icon} {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => setEdit(skill)} className="px-3 py-1.5 rounded-lg btn-outline text-xs cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(skill.id)} className="px-3 py-1.5 rounded-lg text-xs cursor-pointer" style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <div className="text-center py-12 text-sm" style={{ color: 'var(--theme-text-muted)' }}>No skills yet. Add your first category above.</div>
        )}
      </div>
    </div>
  );
}
