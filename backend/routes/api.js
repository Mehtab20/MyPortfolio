import express from 'express';
import { getCV } from '../controllers/cvController.js';
import { getProjects } from '../controllers/projectController.js';
import { submitMessage } from '../controllers/messageController.js';

const router = express.Router();

// GET /api/cv - Returns CV profile data
router.get('/cv', getCV);

// GET /api/projects - Returns all projects
router.get('/projects', getProjects);

// POST /api/message - Stores contact form submissions
router.post('/message', submitMessage);

export default router;
