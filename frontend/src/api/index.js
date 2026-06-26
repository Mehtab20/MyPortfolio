const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchCV = async () => {
  const response = await fetch(`${API_BASE_URL}/cv`);
  if (!response.ok) throw new Error('Failed to fetch CV data');
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const submitContactMessage = async (messageData) => {
  const response = await fetch(`${API_BASE_URL}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
  if (!response.ok) throw new Error('Failed to submit message');
  return response.json();
};
