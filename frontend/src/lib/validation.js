/**
 * Input validation and sanitization utilities.
 * Protects against XSS, injection attacks, and malformed data.
 */

// ─── XSS Sanitization ──────────────────────────────────────────────────────

/**
 * Strip dangerous HTML/script tags from user input.
 * @param {string} str
 * @returns {string}
 */
export function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strip all HTML tags (for rich text contexts where basic tags are allowed).
 * @param {string} str
 * @returns {string}
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

// ─── Email Validation ──────────────────────────────────────────────────────

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// ─── Password Validation ───────────────────────────────────────────────────

/**
 * Validates password strength.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters.' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password must be under 128 characters.' };
  }
  return { valid: true, message: '' };
}

// ─── Name Validation ───────────────────────────────────────────────────────

/**
 * Validates a full name.
 * @param {string} name
 * @returns {{ valid: boolean, message: string }}
 */
export function validateName(name) {
  if (typeof name !== 'string' || !name.trim()) {
    return { valid: false, message: 'Name is required.' };
  }
  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  if (name.trim().length > 100) {
    return { valid: false, message: 'Name must be under 100 characters.' };
  }
  if (/[<>&"']/.test(name)) {
    return { valid: false, message: 'Name contains invalid characters.' };
  }
  return { valid: true, message: '' };
}

// ─── URL Validation ────────────────────────────────────────────────────────

/**
 * Validates a URL string.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// ─── String Length Limits ──────────────────────────────────────────────────

/**
 * Truncates a string to a max length with ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '…';
}

/**
 * Ensures a string doesn't exceed maxLength (silently truncates).
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function limitLength(str, maxLength = 5000) {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength);
}

// ─── Supabase Query Input Guard ────────────────────────────────────────────

/**
 * Validates that a value is a safe string for database queries.
 * Prevents NoSQL/SQL injection in dynamic query building.
 * @param {*} value
 * @returns {boolean}
 */
export function isSafeString(value) {
  if (typeof value !== 'string') return false;
  if (value.length > 10000) return false;
  // Block common injection patterns
  const dangerous = /['";\-\-]|\/\*|\*\//;
  return !dangerous.test(value);
}

// ─── Form Validation Helpers ───────────────────────────────────────────────

/**
 * Validates a contact form submission.
 * @param {Object} data - { name, email, subject, message }
 * @returns {Object} { valid: boolean, errors: Record<string, string> }
 */
export function validateContactForm(data) {
  const errors = {};

  const nameCheck = validateName(data.name);
  if (!nameCheck.valid) errors.name = nameCheck.message;

  if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address.';

  if (!data.subject || data.subject.trim().length < 2) {
    errors.subject = 'Subject is required.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: sanitize(data.name),
      email: sanitize(data.email),
      subject: sanitize(data.subject),
      message: sanitize(data.message),
    },
  };
}
