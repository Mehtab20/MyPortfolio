import pool from '../db/index.js';

export const getCV = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cv_profile LIMIT 1');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'CV profile not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
