import { supabase } from '../supabase';

/**
 * Fetches the single CV profile row from the `cv_profile` table.
 * @returns {Object|null} The profile object, or null if not found.
 */
export const fetchCV = async () => {
  const { data, error } = await supabase
    .from('cv_profile')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching CV:', error);
    return null;
  }

  return data;
};

/**
 * Fetches all projects from the `projects` table, ordered by ID ascending.
 * @returns {Array} Array of project objects.
 */
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
};

/**
 * Inserts a contact message into the `contacts` table.
 * @param {Object} messageData - { name, email, subject, message }
 * @returns {Array} The inserted row(s).
 */
export const submitContactMessage = async (messageData) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([
      {
        full_name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message,
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data;
};