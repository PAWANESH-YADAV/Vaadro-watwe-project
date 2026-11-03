import { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { ForgotPasswordModal } from './components/ForgotPasswordModal'
import { GoogleAuthModal } from './components/GoogleAuthModal'
import { Dashboard } from './components/Dashboard'
import { UserDashboard } from './components/UserDashboard'
import { Maximize2, Minimize2, Split, Monitor } from 'lucide-react'

export function App() {
  const [loggedInUser, setLoggedInUser] = useState<{ identifier: string; name?: string; role?: 'admin' | 'user' } | null>(null)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // 'landscape' = 16:9 Landscape artwork (Clean background + Solid Login Card)
  // 'split' = 2nd Poster + Login Form
  const [layoutMode, setLayoutMode] = useState<'landscape' | 'split'>('landscape')

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => { })
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // If user is authenticated, route to appropriate dashboard:
  // General User ("GU") -> UserDashboard 
  // Admin / Super Admin -> Admin Facility Dashboard
  if (loggedInUser) {
    if (loggedInUser.role === 'admin' || loggedInUser.identifier.toLowerCase().includes('admin')) {
      return (
        <Dashboard
          user={loggedInUser}
          onLogout={() => setLoggedInUser(null)}
        />
      )
    } else {
      return (
        <UserDashboard
          user={loggedInUser}
          onLogout={() => setLoggedInUser(null)}
        />
      )
    }
  }

  return (
    <div className="relative w-screen h-screen min-h-[100dvh] overflow-x-hidden bg-[#07203d] select-none font-sans">
      {/* Top Floating View Switcher */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl shadow-xl text-white text-xs">
        <button
          onClick={() => setLayoutMode('landscape')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${layoutMode === 'landscape'
              ? 'bg-[#0066cc] text-white font-semibold shadow-md'
              : 'text-slate-300 hover:text-white'
            }`}
          title="16:9 Landscape Artwork with Solid Login Card"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>16:9 Landscape</span>
        </button>

        <button
          onClick={() => setLayoutMode('split')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${layoutMode === 'split'
              ? 'bg-[#0066cc] text-white font-semibold shadow-md'
              : 'text-slate-300 hover:text-white'
            }`}
          title="2nd Poster Layout"
        >
          <Split className="w-3.5 h-3.5" />
          <span>Split Layout</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition ml-1"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: 16:9 LANDSCAPE VIEW (Exact Match from Screenshot)       */}
      {/* Background is clean inpainted (NO duplicate card/text underneath)*/}
      {/* Login Card is solid white, crisp, and properly aligned          */}
      {/* ============================================================== */}
      {layoutMode === 'landscape' ? (
        <div
          className="relative w-full h-full min-h-[100dvh] bg-cover bg-center overflow-hidden flex items-center justify-center lg:justify-end px-4 sm:px-8 md:pr-14 lg:pr-16 xl:pr-20"
          style={{
            backgroundImage: `url('/assets/vaadro-full-cleared.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Subtle Mobile Dimming Overlay for readability on small devices */}
          <div className="lg:hidden absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />

          {/* Solid White Login Card */}
          <div className="w-full max-w-[420px] my-auto relative z-20 animate-fadeIn">
            <LoginForm
              onLoginSuccess={(user) => setLoggedInUser(user)}
              onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
              onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
            />
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* MODE 2: SPLIT LAYOUT (2nd Poster Screenshot on Left, Form Right) */
        /* ============================================================== */
        <div className="w-full h-full min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden">
          {/* Left Column: Clean 2nd Screenshot Poster (NO TEXT OVERLAY) */}
          <div className="lg:col-span-7 xl:col-span-7 h-[380px] sm:h-[480px] lg:h-full relative overflow-hidden bg-black flex items-center justify-center">
            <img
              src="/assets/vaadro-poster.jpg"
              alt="VAADRO Mission Clean India Poster"
              className="w-full h-full object-cover object-top sm:object-center select-none"
            />
            <div className="hidden lg:block absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Right Column: Interactive Login Portal */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center p-4 sm:p-8 lg:p-10 bg-gradient-to-br from-[#0c2f5a] via-[#082242] to-[#041224] overflow-y-auto">
            <div className="absolute top-10 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-[420px] my-auto relative z-10">
              <LoginForm
                onLoginSuccess={(user) => setLoggedInUser(user)}
                onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
                onOpenGoogleAuth={() => setIsGoogleAuthOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />

      {/* Google OAuth Modal */}
      <GoogleAuthModal
        isOpen={isGoogleAuthOpen}
        onClose={() => setIsGoogleAuthOpen(false)}
        onSuccess={(googleUser) => {
          setLoggedInUser({
            identifier: googleUser.email,
            name: googleUser.name,
            role: googleUser.email.includes('admin') ? 'admin' : 'user'
          })
        }}
      />
    </div>
  )
}

export default App
