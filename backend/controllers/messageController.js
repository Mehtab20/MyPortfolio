import pool from '../db/index.js';

export const submitMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    // 🤖 N8N AUTOMATION READINESS
    // Here you can add logic to trigger an n8n webhook, e.g.:
    // fetch('https://your-n8n-instance.com/webhook/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(result.rows[0])
    // }).catch(err => console.error('n8n trigger failed:', err));

    res.status(201).json({ success: true, message: 'Message sent successfully!', data: result.rows[0] });
  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
