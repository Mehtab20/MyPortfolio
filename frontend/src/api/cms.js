import { supabase, isConfigured } from '../supabase';

const checkConfig = () => {
  if (!isConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }
};

// ─── Generic helpers ──────────────────────────────────────────

async function getSingle(table) {
  checkConfig();
  const { data, error } = await supabase.from(table).select('*').limit(1).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data || null;
}

async function upsertSingle(table, data) {
  checkConfig();
  const { data: result, error } = await supabase
    .from(table)
    .upsert({ id: 1, ...data, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return result;
}

async function getAll(table, { orderBy = 'sort_order', ascending = true } = {}) {
  checkConfig();
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order(orderBy, { ascending });
  if (error) throw error;
  return data || [];
}

// ─── HERO ──────────────────────────────────────────────────────
export const getHero = () => getSingle('cms_hero');
export const saveHero = (data) => upsertSingle('cms_hero', data);

// ─── ABOUT ─────────────────────────────────────────────────────
export const getAbout = () => getSingle('cms_about');
export const saveAbout = (data) => upsertSingle('cms_about', data);

// ─── SKILLS ────────────────────────────────────────────────────
export const getSkills = () => getAll('cms_skills', { orderBy: 'sort_order' });
export const createSkill = (data) => {
  checkConfig();
  return supabase.from('cms_skills').insert(data).select().single();
};
export const updateSkill = (id, data) => {
  checkConfig();
  return supabase.from('cms_skills').update(data).eq('id', id).select().single();
};
export const deleteSkill = (id) => {
  checkConfig();
  return supabase.from('cms_skills').delete().eq('id', id);
};

// ─── PROJECTS ──────────────────────────────────────────────────
export const getProjects = (all = false) => {
  checkConfig();
  let query = supabase.from('cms_projects').select('*').order('sort_order', { ascending: true });
  if (!all) query = query.eq('published', true);
  return query;
};
export const getProject = (id) => {
  checkConfig();
  return supabase.from('cms_projects').select('*').eq('id', id).single();
};
export const createProject = (data) => {
  checkConfig();
  return supabase.from('cms_projects').insert({
    ...data,
    slug: data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`,
    created_at: new Date().toISOString(),
  }).select().single();
};
export const updateProject = (id, data) => {
  checkConfig();
  return supabase.from('cms_projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select().single();
};
export const deleteProject = (id) => {
  checkConfig();
  return supabase.from('cms_projects').delete().eq('id', id);
};

// ─── BLOG ──────────────────────────────────────────────────────
export const getBlogPosts = (publishedOnly = false) => {
  checkConfig();
  let query = supabase.from('cms_blog').select('*').order('created_at', { ascending: false });
  if (publishedOnly) query = query.eq('published', true);
  return query;
};
export const getBlogPost = (id) => {
  checkConfig();
  return supabase.from('cms_blog').select('*').eq('id', id).single();
};
export const createBlogPost = (data) => {
  checkConfig();
  return supabase.from('cms_blog').insert({
    ...data,
    slug: data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`,
    published_at: data.published ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
  }).select().single();
};
export const updateBlogPost = (id, data) => {
  checkConfig();
  const updates = { ...data, updated_at: new Date().toISOString() };
  if (data.published && !data.published_at) updates.published_at = new Date().toISOString();
  return supabase.from('cms_blog').update(updates).eq('id', id).select().single();
};
export const deleteBlogPost = (id) => {
  checkConfig();
  return supabase.from('cms_blog').delete().eq('id', id);
};

// ─── CONTACT ───────────────────────────────────────────────────
export const getContact = () => getSingle('cms_contact');
export const saveContact = (data) => upsertSingle('cms_contact', data);

// ─── RESUME ────────────────────────────────────────────────────
export const getResumeData = () => getSingle('cms_resume');
export const saveResumeData = (data) => upsertSingle('cms_resume', data);

// ─── SEO ───────────────────────────────────────────────────────
export const getSEO = () => getSingle('cms_seo');
export const saveSEO = (data) => upsertSingle('cms_seo', data);

// ─── SETTINGS ──────────────────────────────────────────────────
export const getSettings = () => getSingle('cms_settings');
export const saveSettings = (data) => upsertSingle('cms_settings', data);

// ─── EXPERIENCE ────────────────────────────────────────────────
export const getExperience = () => getAll('cms_experience', { orderBy: 'sort_order' });
export const createExperience = (data) => {
  checkConfig();
  return supabase.from('cms_experience').insert(data).select().single();
};
export const updateExperience = (id, data) => {
  checkConfig();
  return supabase.from('cms_experience').update(data).eq('id', id).select().single();
};
export const deleteExperience = (id) => {
  checkConfig();
  return supabase.from('cms_experience').delete().eq('id', id);
};

// ─── CERTIFICATIONS ────────────────────────────────────────────
export const getCertifications = () => getAll('cms_certifications', { orderBy: 'sort_order' });
export const createCertification = (data) => {
  checkConfig();
  return supabase.from('cms_certifications').insert(data).select().single();
};
export const updateCertification = (id, data) => {
  checkConfig();
  return supabase.from('cms_certifications').update(data).eq('id', id).select().single();
};
export const deleteCertification = (id) => {
  checkConfig();
  return supabase.from('cms_certifications').delete().eq('id', id);
};

// ─── STORAGE ───────────────────────────────────────────────────
export const uploadFile = async (bucket, path, file) => {
  checkConfig();
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return publicUrl;
};

export const deleteFile = async (bucket, path) => {
  checkConfig();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
};

export const listFiles = async (bucket) => {
  checkConfig();
  const { data, error } = await supabase.storage.from(bucket).list();
  if (error) throw error;
  return data || [];
};

// ─── DATABASE SETUP ────────────────────────────────────────────
export const checkTablesExist = async () => {
  checkConfig();
  try {
    await supabase.from('cms_hero').select('id').limit(1);
    return true;
  } catch {
    return false;
  }
};
