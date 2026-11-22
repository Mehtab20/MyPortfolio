# Site content

Everything shown on the public portfolio comes from these JSON files. They are
edited by hand, from the admin editor, or by an AI agent through a pull request.
The build reads them to pre-render every page, `sitemap.xml` and `llms.txt`.

| File | What it holds |
|---|---|
| `profile.json` | Name, positioning, contact details, links, tagline |
| `about.json` | About paragraphs, the four "What I bring" principles, "At a glance" rows |
| `services.json` | Service cards |
| `skills.json` | Skill groups (`icon` is a name from `components/site/Icons.jsx`; `learning: true` marks the "Currently Learning" group) |
| `experience.json` | Timeline entries, newest first |
| `education.json` | Education cards |
| `projects.json` | Projects and their case studies (`caseStudy: null` shows a card without a detail page) |

## Rules for editors and agents

1. **Accuracy.** Every claim must be supported by the project's code, README or
   docs, or confirmed by Mehtab. No invented metrics, users, clients, results,
   certifications or deployment status.
2. **Keep the shape.** Don't rename keys; components read them directly.
3. **One change per pull request**, with the source of any new fact in the PR description.
