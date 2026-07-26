import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../../api/cms';
import { supabase } from '../../../supabase';

export default function CMSBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const { data } = await getBlogPosts(false);
      setPosts(data || []);
    } catch { toast.error('Failed to load blog'); }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!edit?.title) { toast.error('Title required'); return; }
    try {
      if (edit.id) {
        await updateBlogPost(edit.id, edit);
        toast.success('Post updated');
      } else {
        await createBlogPost(edit);
        toast.success('Post created');
      }
      setEdit(null);
      load();
    } catch (err) { toast.error('Failed: ' + err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try { await deleteBlogPost(id); toast.success('Deleted'); load(); }
    catch (err) { toast.error('Delete failed: ' + err.message); }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 focus:outline-none focus:border-primary/50";
  const inputStyle = { backgroundColor: 'var(--theme-input-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' };

  if (loading) return <div className="card-surface p-8 text-center"><div className="w-8 h-8 animate-spin mx-auto" style={{ border: '2px solid var(--color-primary)', borderTop: '2px solid transparent', borderRadius: '50%', width: 32, height: 32 }} /></div>;

  if (edit) return (
    <div className="card-surface rounded-2xl p-6 golden-border max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold" style={{ color: 'var(--theme-text)' }}>{edit.id ? 'Edit' : 'New'} Post</h3>
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--theme-text)' }}>
          <input type="checkbox" checked={edit.published} onChange={(e) => setEdit({ ...edit, published: e.target.checked })} className="w-4 h-4 rounded" />
          Published
        </label>
      </div>
      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Title</label>
          <input className={inputClass} style={inputStyle} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Excerpt</label>
          <textarea className={inputClass + ' resize-none'} style={inputStyle} rows={3} value={edit.excerpt || ''} onChange={(e) => setEdit({ ...edit, excerpt: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Content (Markdown / HTML)</label>
          <textarea className={inputClass + ' resize-none font-mono text-xs'} style={inputStyle} rows={10} value={edit.content || ''} onChange={(e) => setEdit({ ...edit, content: e.target.value })} />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: 'var(--theme-text-muted)' }}>Tags (comma-separated)</label>
          <input className={inputClass} style={inputStyle} value={(edit.tags || []).join(', ')} onChange={(e) => setEdit({ ...edit, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
        </div>
        <div className="flex gap-3 pt-4">
          <button onClick={handleSave} className="px-6 py-2.5 rounded-xl btn-primary text-sm font-semibold cursor-pointer">Save Post</button>
          <button onClick={() => setEdit(null)} className="px-6 py-2.5 rounded-xl btn-ghost text-sm cursor-pointer">Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{posts.length} posts</p>
        <button onClick={() => setEdit({ title: '', excerpt: '', content: '', tags: [], image: '', published: false })} className="px-4 py-2 rounded-xl btn-primary text-xs font-semibold cursor-pointer">+ New Post</button>
      </div>
      {posts.map((p) => (
        <div key={p.id} className="card-surface rounded-xl p-5 golden-border-hover flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>{p.title}</h4>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.published ? 'text-emerald-500' : 'text-amber-500'}`} style={{ backgroundColor: p.published ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)' }}>{p.published ? 'Published' : 'Draft'}</span>
            </div>
            {p.excerpt && <p className="text-xs line-clamp-1" style={{ color: 'var(--theme-text-muted)' }}>{p.excerpt}</p>}
            <div className="flex flex-wrap gap-1 mt-2">
              {(p.tags || []).map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded text-[9px]" style={{ backgroundColor: 'rgba(20,184,166,0.06)', color: 'var(--color-primary-light)', border: '1px solid rgba(20,184,166,0.12)' }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setEdit(p)} className="px-3 py-1.5 rounded-lg btn-outline text-xs cursor-pointer">Edit</button>
            <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg text-xs cursor-pointer" style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>Delete</button>
          </div>
        </div>
      ))}
      {posts.length === 0 && <div className="text-center py-12 text-sm" style={{ color: 'var(--theme-text-muted)' }}>No blog posts yet.</div>}
    </div>
  );
}
