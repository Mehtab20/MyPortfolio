/*
 * Public site content.
 *
 * The content itself lives in src/content/*.json so that it can be edited
 * from the admin editor or by an AI agent through a pull request, and so the
 * build can pre-render it into HTML. This module only re-exports it.
 *
 * Rule: everything in content/ must match what the project repositories
 * actually show. No invented metrics, clients, users or results.
 */
import profile from '../content/profile.json';
import aboutFile from '../content/about.json';
import services from '../content/services.json';
import skills from '../content/skills.json';
import experience from '../content/experience.json';
import education from '../content/education.json';
import projects from '../content/projects.json';

export { profile, services, experience, education };
export const about = { paragraphs: aboutFile.paragraphs, principles: aboutFile.principles };
export const glance = aboutFile.glance;
export const toolkit = skills;
export const work = projects;
export const getProject = (slug) => work.find((p) => p.slug === slug);
