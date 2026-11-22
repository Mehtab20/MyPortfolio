import { useState } from 'react';
import { submitContactMessage } from '../../api/index.js';
import { useContact } from '../../hooks/useCmsData';
import { profile } from '../../data/site';
import SectionHead from './SectionHead';
import { Icon } from './Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { data: cms } = useContact();
  const email = cms?.email || profile.email;
  const phone = cms?.phone || profile.phone;

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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

  const info = [
    { icon: 'mail', k: 'Email', v: email, href: `mailto:${email}` },
    phone && { icon: 'phone', k: 'Phone', v: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    { icon: 'pin', k: 'Location', v: profile.location },
    { icon: 'linkedin', k: 'LinkedIn', v: 'Mehtab Akbar', href: profile.linkedin, ext: true },
    { icon: 'github', k: 'GitHub', v: '@Mehtab20', href: profile.github, ext: true },
  ].filter(Boolean);

  const sending = state.status === 'sending';

  return (
    <section id="contact" className="s-section" aria-labelledby="contact-title">
      <div className="s-container">
        <SectionHead
          id="contact-title"
          eyebrow="Get in touch"
          title={['Let’s ', { g: 'Connect' }]}
          subtitle="Have a role, a project or a hard problem? Send a message, or reach me directly."
        />
        <div className="s-contact">
          <ul className="s-contact__info">
            {info.map((it, i) => {
              const inner = (
                <>
                  <span className="s-iconbox"><Icon name={it.icon} /></span>
                  <div style={{ minWidth: 0 }}>
                    <p className="s-info__k">{it.k}</p>
                    <p className="s-info__v">{it.v}</p>
                  </div>
                </>
              );
              return (
                <li key={it.k} data-reveal style={{ '--d': `${0.04 * i}s` }}>
                  {it.href ? (
                    <a className="s-card s-info" href={it.href} {...(it.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{inner}</a>
                  ) : (
                    <div className="s-card s-info">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <form className="s-card s-form" onSubmit={onSubmit} noValidate data-reveal style={{ '--d': '0.1s' }}>
            <h3 className="s-h3">Send a Message</h3>
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
              <label htmlFor="c-subject">Subject</label>
              <input id="c-subject" name="subject" className="s-input" value={form.subject} onChange={onChange} placeholder="Role, project, question…" />
            </div>
            <div className="s-field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" className="s-input" required rows={5} value={form.message} onChange={onChange} placeholder="A few lines about what you have in mind." />
            </div>
            <p className={`s-form__status${state.status === 'ok' ? ' s-form__status--ok' : state.status === 'error' ? ' s-form__status--err' : ''}`} role="status" aria-live="polite">
              {state.msg}
            </p>
            <button type="submit" className="s-btn s-btn--block" disabled={sending}>
              {sending ? 'Sending…' : <><Icon name="chat" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
