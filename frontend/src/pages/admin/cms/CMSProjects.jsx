import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getProjects, createProject, updateProject, deleteProject } from '../../../api/cms';
import { supabase } from '../../../supabase';

const emptyProject = {
  title: '', tagline: '', image: '', gradient: 'from-teal-500/20 via-cyan-500/10 to-transparent',
  status: 'Draft', status_color: '#14b8a6', year: '', role_text: '', summary: '',
  problem: '', background: '', objectives: [], features: [], architecture: [],
  tech_stack: [], process: [], challenges: [], results: [], github: '', demo: '', future: [],
  published: false, sort_order: 0,
};

export default function CMSProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await getProjects(true);
      setProjects(data || []);
    } catch { toast.error('Failed to load projects'); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!edit.title) { toast.error('Title required'); return; }
    try {
      const payload = { ...edit, tech_stack: Array.isArray(edit.tech_stack) ? edit.tech_stack : [] };
      if (edit.id) {
        await updateProject(edit.id, payload);
        toast.success('Project updated');
      } else {
        await createProject(payload);
        toast.success('Project created');
      }
      setEdit(null);
      load();
    } catch (err) { toast.error('Failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project permanently?')) return;
    try { await deleteProject(id); toast.success('Deleted'); load(); }
    catch (err) { toast.error('Delete failed: ' + err.message); }
  };

  const uploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = `projects/${Date.now()}_${file.name}`;
      const { data: upload, error } = await supabase.storage.from('cms-images').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('cms-images').getPublicUrl(upload.path);
      setEdit((prev) => ({ ...prev, image: publicUrl }));
      toast.success('Image uploaded');
    } catch (err) { toast.error('Upload failed: ' + err.message); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  if (edit) return (
    <div className="card-surface rounded-2xl p-6 golden-border max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold" style={{ color: 'var(--theme-text)' }}>{edit.id ? 'Edit' : 'New'} Project</h3>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--theme-text)' }}>
            <input type="checkbox" checked={edit.published} onChange={(e) => setEdit({ ...edit, published: e.target.checked })} className="w-4 h-4 rounded" />
            Published
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Title</label>
            <input className={inputClass} style={inputStyle} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Tagline</label>
            <input className={inputClass} style={inputStyle} value={edit.tagline} onChange={(e) => setEdit({ ...edit, tagline: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Status</label>
            <input className={inputClass} style={inputStyle} value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Year</label>
            <input className={inputClass} style={inputStyle} value={edit.year} onChange={(e) => setEdit({ ...edit, year: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Role</label>
            <input className={inputClass} style={inputStyle} value={edit.role_text} onChange={(e) => setEdit({ ...edit, role_text: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Summary</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={edit.summary} onChange={(e) => setEdit({ ...edit, summary: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Problem</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={edit.problem} onChange={(e) => setEdit({ ...edit, problem: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Background</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={edit.background} onChange={(e) => setEdit({ ...edit, background: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Image</label>
          <div className="flex items-center gap-3">
            {edit.image && <img src={edit.image} alt="" className="w-20 h-14 rounded-lg object-cover" />}
            <input type="file" accept="image/*" onChange={uploadImage} className="text-sm" style={{ color: 'var(--theme-text)' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>GitHub URL</label>
            <input className={inputClass} style={inputStyle} value={edit.github} onChange={(e) => setEdit({ ...edit, github: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Demo URL</label>
            <input className={inputClass} style={inputStyle} value={edit.demo} onChange={(e) => setEdit({ ...edit, demo: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Tech Stack (comma-separated)</label>
          <input className={inputClass} style={inputStyle} value={(edit.tech_stack || []).join(', ')} onChange={(e) => setEdit({ ...edit, tech_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
        </div>
        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} className="px-6 py-2.5 rounded-xl btn-primary text-sm font-semibold cursor-pointer">Save Project</button>
          <button onClick={() => setEdit(null)} className="px-6 py-2.5 rounded-xl btn-ghost text-sm cursor-pointer">Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{projects.length} projects</p>
        <button onClick={() => setEdit({ ...emptyProject })} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold cursor-pointer">+ New Project</button>
      </div>
      {projects.map((p) => (
        <div key={p.id} className="card-surface rounded-xl p-5 golden-border-hover flex gap-4">
          {p.image && <img src={p.image} alt="" className="w-20 h-16 rounded-lg object-cover shrink-0" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>{p.title}</h4>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.published ? 'text-emerald-500' : 'text-amber-500'}`} style={{ backgroundColor: p.published ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)' }}>
                {p.published ? 'Published' : 'Draft'}
              </span>
            </div>
            {p.tagline && <p className="text-xs" style={{ color: 'var(--color-primary)' }}>{p.tagline}</p>}
            <p className="text-xs mt-1 line-clamp-1" style={{ color: 'var(--theme-text-muted)' }}>{p.summary}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {(p.tech_stack || []).slice(0, 4).map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded text-[9px]" style={{ backgroundColor: 'rgba(20,184,166,0.06)', color: 'var(--color-primary-light)', border: '1px solid rgba(20,184,166,0.12)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 shrink-0 items-start">
            <button onClick={() => setEdit(p)} className="px-3 py-1.5 rounded-lg btn-outline text-xs cursor-pointer">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs cursor-pointer" style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
