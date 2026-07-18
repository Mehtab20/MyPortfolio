import { supabase } from '../supabase';

/**
 * Fetches the user profile from the `profiles` table.
 * @param {string} userId - The authenticated user's ID
 * @returns {Object|null} The profile object
 */
export const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

/**
 * Creates or updates a user profile.
 * @param {Object} profile - { id, email, full_name, avatar_url, role }
 * @returns {Object} The upserted profile
 */
export const upsertProfile = async (profile) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Fetches all user profiles (admin only).
 * @returns {Array} Array of profile objects
 */
export const fetchAllProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Updates a user's role (admin only).
 * @param {string} userId - The user's ID
 * @param {string} role - The new role ('user' or 'admin')
 */
export const updateUserRole = async (userId, role) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
