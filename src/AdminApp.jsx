import React, { useEffect, useState } from 'react';
import defaultContent from '../content/portfolio.json';

const tabs = [
  { label: 'Site & menu', keys: ['site', 'navigation'] },
  { label: 'Hero', keys: ['hero'] },
  { label: 'About', keys: ['about'] },
  { label: 'Skills', keys: ['skills'] },
  { label: 'CloudOps', keys: ['cloudOps'] },
  { label: 'GitHub projects', keys: ['projects'] },
  { label: 'Contact & resume', keys: ['contact'] },
  { label: 'Security', keys: [] },
];

function labelFor(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase());
}

function templateAt(path) {
  let current = defaultContent;
  for (const part of path) current = Array.isArray(current) ? current[0] : current[part];
  return current;
}

function blankFrom(example) {
  if (typeof example === 'string') return '';
  if (Array.isArray(example)) return [];
  return Object.fromEntries(Object.entries(example).map(([key, value]) => [key, blankFrom(value)]));
}

function updatePath(source, path, updater) {
  const copy = structuredClone(source);
  let target = copy;
  for (const part of path.slice(0, -1)) target = target[part];
  const last = path.at(-1);
  target[last] = updater(target[last]);
  return copy;
}

function FieldEditor({ value, path, name, onChange }) {
  const label = labelFor(name);
  const id = path.join('-');
  const long = value.length > 90 || ['summary', 'intro', 'problem', 'solution', 'contribution', 'closingText', 'description', 'detail'].includes(name);
  const inputType = name === 'email' ? 'email' : ['url', 'link', 'profileUrl'].includes(name) ? 'url' : 'text';

  if (name === 'icon') {
    return (
      <label className="block text-sm text-devops-textMuted">
        {label}
        <select id={id} value={value} onChange={(event) => onChange(path, event.target.value)} className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text">
          <option value="github">GitHub</option>
          <option value="linkedin">LinkedIn</option>
          <option value="website">Website</option>
        </select>
      </label>
    );
  }
  return (
    <label className="block text-sm text-devops-textMuted">
      {label}
      {long ? (
        <textarea id={id} rows={Math.min(6, Math.max(3, Math.ceil(value.length / 90)))} value={value} onChange={(event) => onChange(path, event.target.value)} className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text leading-relaxed" />
      ) : (
        <input id={id} type={inputType} value={value} onChange={(event) => onChange(path, event.target.value)} className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
      )}
    </label>
  );
}

function ContentEditor({ value, path, name, onChange, onAdd, onRemove, onMove }) {
  if (typeof value === 'string') {
    return <FieldEditor value={value} path={path} name={name} onChange={onChange} />;
  }
  if (Array.isArray(value)) {
    return (
      <div className="border border-devops-border rounded-xl p-4 md:p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-devops-text font-bold">{labelFor(name)} <span className="text-devops-textMuted font-normal">({value.length})</span></h3>
          <button type="button" onClick={() => onAdd(path)} className="px-3 py-2 rounded-lg border border-devops-primary text-devops-primary text-sm hover:bg-devops-primary/10">Add item</button>
        </div>
        {value.map((item, index) => (
          <div key={index} className="bg-devops-bg/60 border border-devops-border/70 rounded-lg p-4">
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-devops-secondary font-mono text-xs">{item.title || item.label || 'Item ' + (index + 1)}</span>
              <div className="flex gap-2">
                <button type="button" disabled={index === 0} onClick={() => onMove(path, index, -1)} className="text-xs text-devops-textMuted disabled:opacity-30 hover:text-devops-text">↑</button>
                <button type="button" disabled={index === value.length - 1} onClick={() => onMove(path, index, 1)} className="text-xs text-devops-textMuted disabled:opacity-30 hover:text-devops-text">↓</button>
                <button type="button" onClick={() => onRemove(path, index)} className="text-xs text-red-300 hover:text-red-200">Remove</button>
              </div>
            </div>
            <ContentEditor value={item} path={[...path, index]} name={'item ' + (index + 1)} onChange={onChange} onAdd={onAdd} onRemove={onRemove} onMove={onMove} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {Object.entries(value).map(([key, child]) => (
        <ContentEditor key={key} value={child} path={[...path, key]} name={key} onChange={onChange} onAdd={onAdd} onRemove={onRemove} onMove={onMove} />
      ))}
    </div>
  );
}

async function apiJson(url, options) {
  const response = await fetch(url, { credentials: 'include', ...options });
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.error || 'Request failed.');
    error.status = response.status;
    throw error;
  }
  return body;
}

const postJson = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the PDF.'));
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.readAsDataURL(file);
  });
}

export default function AdminApp() {
  const [phase, setPhase] = useState('loading');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [content, setContent] = useState(null);
  const [source, setSource] = useState('');
  const [sha, setSha] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [commitUrl, setCommitUrl] = useState('');
  const dirty = content && JSON.stringify(content) !== source;

  useEffect(() => {
    document.title = 'Portfolio Admin';
    let active = true;
    apiJson('/api/admin/session')
      .then((session) => {
        if (!active) return;
        if (!session.configured) setPhase('setup');
        else if (session.authenticated) {
          apiJson('/api/admin/content').then((result) => {
            if (!active) return;
            setContent(result.content);
            setSource(JSON.stringify(result.content));
            setSha(result.sha);
            setPhase('editor');
          }).catch(() => { if (active) setPhase('login'); });
        } else setPhase('login');
      })
      .catch(() => { if (active) setPhase('error'); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const warn = (event) => {
      if (!dirty) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function loadContent() {
    const result = await apiJson('/api/admin/content');
    setContent(result.content);
    setSource(JSON.stringify(result.content));
    setSha(result.sha);
    setPhase('editor');
  }

  async function signIn(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await apiJson('/api/admin/login', postJson('POST', { password }));
      setPassword('');
      await loadContent();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await apiJson('/api/admin/logout', postJson('POST', {}));
    setContent(null);
    setSource('');
    setSha('');
    setPhase('login');
  }

  async function changeAdminPassword(event) {
    event.preventDefault();
    if (newPassword !== confirmPassword) return setMessage('New passwords do not match.');
    setBusy(true);
    setMessage('');
    setCommitUrl('');
    try {
      const result = await apiJson('/api/admin/password', postJson('PUT', { currentPassword, newPassword }));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage(result.message);
      setCommitUrl(result.commitUrl || '');
    } catch (error) {
      setMessage(error.message);
      if (error.status === 401 && error.message === 'Please sign in again.') setPhase('login');
    } finally {
      setBusy(false);
    }
  }

  async function recoverPassword(event) {
    event.preventDefault();
    if (newPassword !== confirmPassword) return setMessage('New passwords do not match.');
    setBusy(true);
    setMessage('');
    setCommitUrl('');
    try {
      const result = await apiJson('/api/admin/recover', postJson('POST', { recoveryCode, newPassword }));
      setRecoveryCode('');
      setNewPassword('');
      setConfirmPassword('');
      await loadContent();
      setMessage(result.message);
      setCommitUrl(result.commitUrl || '');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  function change(path, value) {
    setContent((current) => updatePath(current, path, () => value));
    setMessage('');
  }

  function add(path) {
    const example = templateAt([...path, 0]);
    setContent((current) => updatePath(current, path, (items) => [...items, blankFrom(example)]));
  }

  function remove(path, index) {
    setContent((current) => updatePath(current, path, (items) => items.filter((_, itemIndex) => itemIndex !== index)));
  }

  function move(path, index, direction) {
    setContent((current) => updatePath(current, path, (items) => {
      const next = [...items];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    }));
  }

  async function save() {
    setBusy(true);
    setMessage('');
    setCommitUrl('');
    try {
      const result = await apiJson('/api/admin/content', postJson('PUT', { content, sha }));
      setSha(result.sha);
      setSource(JSON.stringify(content));
      setMessage(result.message);
      setCommitUrl(result.commitUrl || '');
    } catch (error) {
      setMessage(error.message);
      if (error.status === 401) setPhase('login');
    } finally {
      setBusy(false);
    }
  }

  async function uploadResume(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = '';
    if (file.size > 2_000_000) {
      setMessage('Choose a PDF smaller than 2 MB.');
      return;
    }
    setBusy(true);
    setMessage('');
    try {
      const contentBase64 = await fileToBase64(file);
      const result = await apiJson('/api/admin/resume', postJson('PUT', { contentBase64 }));
      setMessage(result.message);
      setCommitUrl(result.commitUrl || '');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-devops-bg text-devops-text">
      <header className="border-b border-devops-border bg-devops-card px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-devops-primary">Portfolio Admin</h1>
            <p className="text-devops-textMuted text-sm">Edit and publish the information on your portfolio.</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-devops-secondary hover:underline">View live site ↗</a>
            {phase === 'editor' && <button type="button" onClick={signOut} className="text-devops-textMuted hover:text-devops-text">Sign out</button>}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {phase === 'loading' && <p>Checking admin access…</p>}
        {phase === 'error' && <p className="text-red-300">Admin service is unavailable. Try again later.</p>}
        {phase === 'setup' && (
          <div className="max-w-2xl bg-devops-card border border-devops-border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-4">One-time setup needed</h2>
            <p className="text-devops-textMuted mb-4">The admin panel is deployed, but the server needs its private credentials before sign-in can be enabled.</p>
            <p className="text-devops-textMuted">Set PORTFOLIO_ADMIN_PASSWORD, PORTFOLIO_SESSION_SECRET, PORTFOLIO_RECOVERY_CODE and PORTFOLIO_GITHUB_TOKEN in the Vercel Production environment, then redeploy. Follow the setup steps in the repository README. Save the recovery code privately. Enter secrets only in Vercel, never on this public page or in chat.</p>
          </div>
        )}
        {phase === 'login' && (
          <form onSubmit={signIn} className="max-w-md bg-devops-card border border-devops-border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-5">Sign in</h2>
            <label className="block text-sm text-devops-textMuted">
              Admin password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
            </label>
            <button type="submit" disabled={busy} className="mt-6 px-6 py-3 bg-devops-primary text-devops-bg font-bold rounded-lg disabled:opacity-50">Sign in</button>
            <button type="button" onClick={() => { setPhase('recover'); setMessage(''); }} className="block mt-5 text-sm text-devops-secondary hover:underline">Forgot password?</button>
          </form>
        )}
        {phase === 'recover' && (
          <form onSubmit={recoverPassword} className="max-w-md bg-devops-card border border-devops-border rounded-2xl p-8 space-y-5">
            <h2 className="text-xl font-bold">Reset admin password</h2>
            <p className="text-devops-textMuted text-sm">Use the private recovery code saved during setup. This signs out other admin sessions.</p>
            <label className="block text-sm text-devops-textMuted">Recovery code
              <input type="password" value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)} autoComplete="off" required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
            </label>
            <label className="block text-sm text-devops-textMuted">New password
              <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" minLength={20} maxLength={256} required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
            </label>
            <label className="block text-sm text-devops-textMuted">Confirm new password
              <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={20} maxLength={256} required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
            </label>
            <button type="submit" disabled={busy} className="px-6 py-3 bg-devops-primary text-devops-bg font-bold rounded-lg disabled:opacity-50">Reset password</button>
            <button type="button" onClick={() => { setPhase('login'); setMessage(''); }} className="block text-sm text-devops-secondary hover:underline">Back to sign in</button>
          </form>
        )}
        {phase === 'editor' && content && (
          <>
            {tabs[tabIndex].label !== 'Security' && <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-devops-textMuted text-sm">{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
              <button type="button" disabled={!dirty || busy} onClick={save} className="px-5 py-3 bg-devops-primary text-devops-bg font-bold rounded-lg disabled:opacity-40">Save & publish</button>
              <button type="button" disabled={!dirty || busy} onClick={() => { setContent(JSON.parse(source)); setMessage('Unsaved edits discarded.'); }} className="px-4 py-3 border border-devops-border rounded-lg disabled:opacity-40">Discard edits</button>
            </div>}
            {tabs[tabIndex].label !== 'Security' && <p className="text-devops-textMuted text-sm mb-7">Saving creates a GitHub commit. The live site updates when Vercel finishes deploying it.</p>}
            <div className="grid lg:grid-cols-[220px_1fr] gap-7">
              <nav aria-label="Editor sections" className="flex lg:flex-col flex-wrap gap-2 self-start">
                {tabs.map((tab, index) => (
                  <button key={tab.label} type="button" onClick={() => setTabIndex(index)} className={'text-left px-4 py-3 rounded-lg border text-sm ' + (tabIndex === index ? 'bg-devops-primary/10 border-devops-primary text-devops-primary' : 'border-devops-border text-devops-textMuted hover:text-devops-text')}>
                    {tab.label}
                  </button>
                ))}
              </nav>
              <div className="bg-devops-card/40 border border-devops-border rounded-2xl p-5 md:p-8 space-y-8">
                <h2 className="text-2xl font-bold">{tabs[tabIndex].label}</h2>
                {tabs[tabIndex].keys.map((key) => (
                  <section key={key} className="space-y-5">
                    {tabs[tabIndex].keys.length > 1 && <h3 className="text-lg font-bold text-devops-secondary">{labelFor(key)}</h3>}
                    <ContentEditor value={content[key]} path={[key]} name={key} onChange={change} onAdd={add} onRemove={remove} onMove={move} />
                  </section>
                ))}
                {tabs[tabIndex].label === 'Contact & resume' && (
                  <div className="border-t border-devops-border pt-6">
                    <h3 className="text-lg font-bold mb-2">Replace resume PDF</h3>
                    <p className="text-devops-textMuted text-sm mb-4">Choose a PDF under 2 MB. This replaces the download on the live site after deployment.</p>
                    <input type="file" accept="application/pdf,.pdf" disabled={busy} onChange={uploadResume} className="text-sm text-devops-textMuted" />
                  </div>
                )}
                {tabs[tabIndex].label === 'Security' && (
                  <form onSubmit={changeAdminPassword} className="max-w-lg space-y-5">
                    <p className="text-devops-textMuted text-sm">Change your admin password here. Use at least 20 characters. Other signed-in sessions will be logged out.</p>
                    <label className="block text-sm text-devops-textMuted">Current password
                      <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
                    </label>
                    <label className="block text-sm text-devops-textMuted">New password
                      <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" minLength={20} maxLength={256} required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
                    </label>
                    <label className="block text-sm text-devops-textMuted">Confirm new password
                      <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={20} maxLength={256} required className="mt-2 w-full bg-devops-bg border border-devops-border rounded-lg p-3 text-devops-text" />
                    </label>
                    <button type="submit" disabled={busy} className="px-6 py-3 bg-devops-primary text-devops-bg font-bold rounded-lg disabled:opacity-50">Change password</button>
                  </form>
                )}
              </div>
            </div>
          </>
        )}
        {message && <div role="status" className="mt-7 p-4 border border-devops-secondary/40 bg-devops-card rounded-lg text-sm">{message} {commitUrl.startsWith('https://github.com/') && <a href={commitUrl} target="_blank" rel="noopener noreferrer" className="text-devops-primary underline">View commit</a>}</div>}
      </main>
    </div>
  );
}
