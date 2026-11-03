import React, { useState } from 'react'
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { VaadroLogo } from './VaadroLogo'

interface LoginFormProps {
  onLoginSuccess: (user: { identifier: string; name?: string; role: 'admin' | 'user' }) => void
  onOpenForgotPassword: () => void
  onOpenGoogleAuth: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onOpenForgotPassword,
  onOpenGoogleAuth,
}) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateForm = () => {
    if (!identifier.trim()) {
      setError('Please enter your Email ID or Mobile Number')
      return false
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())
    const isPhone = /^[0-9]{10}$/.test(identifier.trim().replace(/\D/g, ''))

    if (!isEmail && !isPhone) {
      setError('Enter a valid Email ID or 10-digit Mobile Number')
      return false
    }

    if (!password) {
      setError('Please enter your password')
      return false
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters')
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    const isAdmin = identifier.toLowerCase().includes('admin')

    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess({
        identifier,
        name: isAdmin ? 'Admin' : 'Rahul Sharma',
        role: isAdmin ? 'admin' : 'user'
      })
    }, 800)
  }

  return (
    <div className="w-full bg-white rounded-[26px] sm:rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100 px-6 sm:px-8 py-5 sm:py-6 select-none transition-all flex flex-col justify-between">
      {/* 1. VAADRO Logo */}
      <div className="flex flex-col items-center">
        <VaadroLogo size="md" />

        {/* 2. Welcome Back & Subtitle */}
        <h2 className="text-[24px] sm:text-[26px] font-extrabold text-[#0c2340] mt-1.5 tracking-tight font-sans">
          Welcome Back
        </h2>
        <p className="text-[#64748b] text-[12.5px] sm:text-[13px] font-medium mt-0.5">
          Login to your VAADRO account
        </p>

        {/* 3. Water Droplet Divider */}
        <div className="w-full flex items-center justify-center my-2.5 relative">
          <div className="w-full border-t border-[#e2e8f0]"></div>
          <div className="absolute px-2 bg-white">
            <svg
              className="w-3.5 h-4 text-[#0284c7] fill-[#0284c7]"
              viewBox="0 0 16 20"
              fill="currentColor"
            >
              <path d="M8 1C8 1 2 8 2 13C2 16.3137 4.68629 19 8 19C11.3137 19 14 16.3137 14 13C14 8 8 1 8 1Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Login Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-3 mt-1">
        {/* Error Notification */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium">
            {error}
          </div>
        )}

        {/* Input: Email / Mobile */}
        <div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-[#64748b] pointer-events-none flex items-center">
              <User className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value)
                if (error) setError(null)
              }}
              placeholder="Email ID / Mobile Number"
              className="w-full pl-10 pr-3 py-2.5 bg-white text-[#1e293b] placeholder-[#94a3b8] text-[13px] sm:text-[13.5px] rounded-xl border border-[#cbd5e1] focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
            />
          </div>
        </div>

        {/* Input: Password */}
        <div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-[#64748b] pointer-events-none flex items-center">
              <Lock className="w-[18px] h-[18px]" strokeWidth={2} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(null)
              }}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 bg-white text-[#1e293b] placeholder-[#94a3b8] text-[13px] sm:text-[13.5px] rounded-xl border border-[#cbd5e1] focus:border-[#0066cc] focus:ring-2 focus:ring-blue-100 outline-none transition shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[#94a3b8] hover:text-[#475569] focus:outline-none transition p-1"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <Eye className="w-[17px] h-[17px]" strokeWidth={2} />
              ) : (
                <EyeOff className="w-[17px] h-[17px]" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Row: Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-[12px] sm:text-[12.5px] pt-0.5">
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-[#475569] font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-gray-300 accent-[#0066cc] cursor-pointer"
            />
            <span>Remember Me</span>
          </label>

          <button
            type="button"
            onClick={onOpenForgotPassword}
            className="text-[#0066cc] hover:text-[#004d99] font-semibold transition"
          >
            Forgot Password?
          </button>
        </div>

        {/* Main Action: Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#0066cc] hover:bg-[#0055ab] active:bg-[#00478f] text-white font-bold py-2.5 sm:py-3 px-4 rounded-xl shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 text-[14px] sm:text-[14.5px] transition-all disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>

        {/* Divider: OR */}
        <div className="relative flex items-center justify-center py-0.5">
          <div className="w-full border-t border-[#e2e8f0]"></div>
          <span className="absolute bg-white px-2.5 text-[11px] font-semibold text-[#94a3b8] tracking-widest uppercase">
            OR
          </span>
        </div>

        {/* Social Sign-in: Google */}
        <button
          type="button"
          onClick={onOpenGoogleAuth}
          className="w-full bg-white hover:bg-[#f8fafc] active:bg-[#f1f5f9] text-[#334155] font-semibold py-2 sm:py-2.5 px-4 rounded-xl border border-[#cbd5e1] shadow-sm flex items-center justify-center gap-2.5 text-[13px] sm:text-[13.5px] transition-all cursor-pointer"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </form>

      {/* 5. Footer Copyright & Quick Demo */}
      <div className="pt-3 text-center">
        <p className="text-[11px] text-[#94a3b8] font-normal">
          © 2026 VAADRO. All rights reserved.
        </p>

        <div className="mt-2 flex flex-col gap-1 items-center">
          <button
            onClick={() => {
              setIdentifier('rahul.sharma@gmail.com')
              setPassword('rahul@2026')
              setError(null)
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false)
                onLoginSuccess({
                  identifier: 'rahul.sharma@gmail.com',
                  name: 'Rahul Sharma',
                  role: 'user'
                })
              }, 500)
            }}
            type="button"
            className="text-[11px] text-[#0066cc] hover:text-blue-800 font-bold bg-blue-50 hover:bg-blue-100 py-1 px-3 rounded-lg border border-blue-200 transition cursor-pointer flex items-center gap-1 shadow-2xs"
          >
            👤 Instant Login as General User (Rahul Sharma)
          </button>
          <button
            onClick={() => {
              setIdentifier('admin@vaadro.com')
              setPassword('admin@2026')
              setError(null)
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false)
                onLoginSuccess({
                  identifier: 'admin@vaadro.com',
                  name: 'Admin',
                  role: 'admin'
                })
              }, 500)
            }}
            type="button"
            className="text-[10px] text-slate-500 hover:text-slate-800 underline font-medium transition cursor-pointer"
          >
            👑 Or Login as Super Admin
          </button>
        </div>
      </div>
    </div>
  )
}
