const text = '';

const schema = {
  site: { brand: text, title: text, description: text, applicationName: text, footer: text },
  navigation: {
    items: [{ label: text, href: text }], admin: text,
  },
  hero: {
    badge: text, firstName: text, lastName: text, role: text, summary: text,
    primaryButton: text, resumeButton: text, focusHeading: text,
    focusAreas: [{ title: text, detail: text }],
  },
  about: {
    heading: text, sectionNumber: text, paragraphs: [text], areas: [{ title: text, description: text }],
  },
  skills: {
    heading: text, sectionNumber: text, categories: [{ title: text, skills: [text] }],
  },
  cloudOps: {
    heading: text, sectionNumber: text, problemLabel: text, solutionLabel: text,
    status: text, organization: text, period: text, title: text,
    intro: text, role: text,
    work: [{ title: text, status: text, problem: text, solution: text }],
    personalProjects: [{ title: text, status: text, problem: text, solution: text }],
  },
  projects: {
    heading: text, sectionNumber: text, problemLabel: text, workLabel: text,
    repositoryLinkLabel: text, intro: text, profileUrl: text, profileLabel: text,
    items: [{
      title: text, type: text, problem: text, contribution: text,
      technologies: [text], link: text,
    }],
  },
  customSections: [{ id: text, heading: text, paragraphs: [text] }],
  contact: {
    heading: text, intro: text,
    links: [{ label: text, subtext: text, url: text, icon: text }],
    emailLinkLabel: text, emailLinkSubtext: text,
    resumeHeading: text, resumeButton: text, resumeSubtext: text,
    closingEyebrow: text, closingHeading: text, closingText: text,
    closingButton: text, fallbackText: text, email: text,
  },
};

function check(value, shape, path) {
  if (typeof shape === 'string') {
    if (typeof value !== 'string' || value.length > 5000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
      return `${path} must be text under 5,000 characters.`;
    }
    return null;
  }
  if (Array.isArray(shape)) {
    if (!Array.isArray(value) || value.length > 50) return `${path} must be a list of at most 50 items.`;
    for (let index = 0; index < value.length; index += 1) {
      const error = check(value[index], shape[0], `${path}[${index}]`);
      if (error) return error;
    }
    return null;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return `${path} must be a group of fields.`;
  const keys = Object.keys(shape);
  if (Object.keys(value).length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))) {
    return `${path} has missing or unexpected fields.`;
  }
  for (const key of keys) {
    const error = check(value[key], shape[key], `${path}.${key}`);
    if (error) return error;
  }
  return null;
}

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function validateContent(content) {
  if (!content || typeof content !== 'object') return 'Content must be an object.';
  if (JSON.stringify(content).length > 100_000) return 'Content is too large.';
  const structureError = check(content, schema, 'content');
  if (structureError) return structureError;
  const builtInIds = ['hero', 'about', 'skills', 'infra-projects', 'projects', 'contact-links', 'contact'];
  const sectionIds = new Set(builtInIds);
  for (const section of content.customSections) {
    if (!/^[a-z][a-z0-9-]{0,63}$/.test(section.id) || sectionIds.has(section.id)) {
      return 'Each custom section needs a unique ID using lowercase letters, numbers and hyphens.';
    }
    if (!section.heading.trim()) return 'Each custom section needs a heading.';
    sectionIds.add(section.id);
  }
  for (const item of content.navigation.items) {
    if (!item.label.trim()) return 'Each navigation item needs a label.';
    if (item.href.startsWith('#')) {
      if (!sectionIds.has(item.href.slice(1))) return `Navigation target ${item.href} does not exist.`;
    } else if (!isHttpsUrl(item.href)) {
      return 'Navigation links must use an existing #section-id or an https:// URL.';
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contact.email)) return 'Enter a valid contact email address.';
  if (!isHttpsUrl(content.projects.profileUrl)) return 'GitHub profile URL must start with https://.';
  for (const project of content.projects.items) {
    if (!isHttpsUrl(project.link)) return 'Each GitHub project needs an https:// link.';
  }
  for (const link of content.contact.links) {
    if (!isHttpsUrl(link.url)) return 'Each contact link needs an https:// URL.';
    if (!['github', 'linkedin', 'website'].includes(link.icon)) return 'Contact link icon must be GitHub, LinkedIn or Website.';
  }
  return null;
}
