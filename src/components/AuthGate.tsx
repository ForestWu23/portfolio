import { useState, useCallback, Suspense, ReactNode } from 'react'

const HASH = '2d6c50388f532bd1bbe52e5a25fad2a7fd3955bb2855b0b72cd28765e78b62e9'
const STORAGE_KEY = 'pf_auth'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function isAuthenticated(): boolean {
  return sessionStorage.getItem(STORAGE_KEY) === HASH
}

export function checkAuth(): boolean {
  return isAuthenticated()
}

export function AuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(isAuthenticated)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const h = await sha256(password)
    if (h === HASH) {
      sessionStorage.setItem(STORAGE_KEY, HASH)
      setAuthed(true)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }, [password])

  if (authed) {
    return <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>{children}</Suspense>
  }

  return (
    <div className="ag-backdrop">
      <div className={`ag-modal${shaking ? ' ag-shake' : ''}`}>
        <div className="ag-icon">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <h2 className="ag-title">Password Required</h2>
        <p className="ag-desc">This project is password-protected. Please enter the password to view.</p>
        <form onSubmit={handleSubmit} className="ag-form">
          <input
            type="password"
            className={`ag-input${error ? ' ag-input-error' : ''}`}
            placeholder="Enter password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            autoFocus
          />
          {error && <span className="ag-error">Incorrect password. Please try again.</span>}
          <button type="submit" className="ag-submit">Unlock</button>
        </form>
      </div>
    </div>
  )
}
