import pool from '../db/index.js';

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    const projects = result.rows.map(project => ({
      ...project,
      tech: typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech
    }));
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
