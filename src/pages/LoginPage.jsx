export function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--teal-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📬</div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>Publer</span>
        </div>
        <h1 style={{ margin: '0 0 24px', fontSize: 22 }}>Sign in</h1>
        <input type="email" placeholder="Email" style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid var(--hairline)' }} />
        <input type="password" placeholder="Password" style={{ width: '100%', padding: 12, marginBottom: 20, borderRadius: 8, border: '1px solid var(--hairline)' }} />
        <button type="button" className="btn-teal" style={{ width: '100%' }} onClick={() => { window.location.href = '/inbox'; }}>
          Sign in (demo)
        </button>
      </div>
    </div>
  );
}
