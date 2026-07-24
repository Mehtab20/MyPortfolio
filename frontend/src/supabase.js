import { createClient } from '@supabase/supabase-js';

// First try env vars (for production), fall back to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sizhxbwnjxhtxtnkyvlr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpemh4Ynduanh0ZXh0bmt5dmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxOTQyMDksImV4cCI6MjA5ODc3MDIwOX0.8UM-EkH_6zbZpKBpk73XhhZ0tkS4oMRLy67pN7mi1WQ';

const isConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabase = null;

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Supabase initialization failed:', err);
  }
}

export { supabase, isConfigured };
