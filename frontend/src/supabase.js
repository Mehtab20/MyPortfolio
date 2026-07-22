import { createClient } from '@supabase/supabase-js';

// First try env vars (for production), fall back to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://spfsnxfvyvebwcldhknm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZnNueGZ2eXZlYndjbGRoa25tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MDAxNTEsImV4cCI6MjA5OTk3NjE1MX0.MA5YOTXHv5MxesGfbkrp_gscCzOARa-3L1DBaNNLm3o';

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
