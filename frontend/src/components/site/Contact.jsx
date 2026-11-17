import { useState } from 'react';
import { submitContactMessage } from '../../api/index.js';
import { useContact } from '../../hooks/useCmsData';
import { profile } from '../../data/site';
import { Arrow, CheckIcon, CopyIcon } from './Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { data: cms } = useContact();
  const email = cms?.email || profile.email;
  const phone = cms?.phone || profile.phone;
  const github = cms?.social_links?.find((s) => s.icon === 'github')?.url || profile.github;
  const linkedin = cms?.social_links?.find((s) => s.icon === 'linkedin')?.url || profile.linkedin;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const [copied, setCopied] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !EMAIL_RE.test(form.email) || form.message.trim().length < 10) {
      setState({ status: 'error', msg: 'Please add your name, a valid email and a message of at least 10 characters.' });
      return;
    }
    setState({ status: 'sending', msg: '' });
    try {
      await submitContactMessage({ ...form, subject: form.subject.trim() || 'Portfolio enquiry' });
      setForm({ name: '', email: '', subject: '', message: '' });
      setState({ status: 'ok', msg: 'Thanks. Your message has been sent, and I’ll reply by email.' });
    } catch (err) {
      console.error(err);
      setState({ status: 'error', msg: `That didn’t go through. You can email me directly at ${email}.` });
    }
  };

  const sending = state.status === 'sending';

  return (
    <section id="contact" className="s-section" aria-labelledby="contact-title">
      <div className="s-container">
        <header className="s-grid s-section-head">
          <p className="s-label" data-reveal>05 — Contact</p>
          <h2 id="contact-title" className="s-section-title" data-reveal style={{ '--d': '0.05s' }}>
            Have a role, a project or a hard problem? <span className="s-serif">Let’s talk.</span>
          </h2>
        </header>

        <div className="s-grid s-contact">
          <div className="s-contact__intro" data-reveal>
            <p className="s-body" style={{ maxWidth: '42ch' }}>
              I’m interested in engineering roles, product work and collaborations, especially in healthcare and applied AI.
              Email is the fastest way to reach me.
            </p>
            <div className="s-email">
              <a className="s-email__addr s-link s-link--underlined" href={`mailto:${email}`}>{email}</a>
              <button type="button" className="s-icon-btn" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'} title="Copy email">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
              <span className="s-sr-only" aria-live="polite">{copied ? 'Email address copied to clipboard' : ''}</span>
            </div>

            <ul className="s-channels">
              <li>
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <span className="s-label">LinkedIn</span>
                  <span>Mehtab Akbar <Arrow dir="ne" /></span>
                </a>
              </li>
              <li>
                <a href={github} target="_blank" rel="noreferrer">
                  <span className="s-label">GitHub</span>
                  <span>@Mehtab20 <Arrow dir="ne" /></span>
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>
                    <span className="s-label">Phone</span>
                    <span>{phone}</span>
                  </a>
                </li>
              )}
              <li>
                <span className="s-channel">
                  <span className="s-label">Location</span>
                  <span>{profile.location} · UTC+5</span>
                </span>
              </li>
            </ul>
          </div>

          <form className="s-contact__form s-form" onSubmit={onSubmit} noValidate data-reveal style={{ '--d': '0.1s' }}>
            <div className="s-form__row">
              <div className="s-field">
                <label htmlFor="c-name">Name</label>
                <input id="c-name" name="name" className="s-input" autoComplete="name" required value={form.name} onChange={onChange} placeholder="Your name" />
              </div>
              <div className="s-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" className="s-input" autoComplete="email" required value={form.email} onChange={onChange} placeholder="you@company.com" />
              </div>
            </div>
            <div className="s-field">
              <label htmlFor="c-subject">Subject <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <input id="c-subject" name="subject" className="s-input" value={form.subject} onChange={onChange} placeholder="Role, project, question…" />
            </div>
            <div className="s-field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" className="s-input" required rows={5} value={form.message} onChange={onChange} placeholder="A few lines about what you have in mind." />
            </div>
            <div className="s-form__foot">
              <p
                className={`s-form__status${state.status === 'ok' ? ' s-form__status--ok' : state.status === 'error' ? ' s-form__status--err' : ''}`}
                role="status"
                aria-live="polite"
              >
                {state.msg || <span className="s-form__note">I’ll reply to the email you give.</span>}
              </p>
              <button type="submit" className="s-btn" disabled={sending}>
                {sending ? 'Sending…' : 'Send message'} {!sending && <Arrow />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
