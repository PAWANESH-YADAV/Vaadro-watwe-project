import React, { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

interface GoogleAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: { name: string; email: string; avatar: string }) => void
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [loadingUser, setLoadingUser] = useState<string | null>(null)

  if (!isOpen) return null

  const accounts = [
    {
      name: 'Pawan Kumar',
      email: 'pawan.kumar@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'VAADRO Partner User',
      email: 'dealer.sales@vaadro.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
    }
  ]

  const handleSelectAccount = (acc: typeof accounts[0]) => {
    setLoadingUser(acc.email)
    setTimeout(() => {
      setLoadingUser(null)
      onSuccess(acc)
      onClose()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="flex flex-col items-center mb-5">
          <svg className="w-8 h-8 mb-2" viewBox="0 0 24 24">
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
          <h4 className="text-lg font-bold text-gray-900">Sign in with Google</h4>
          <p className="text-xs text-gray-500">to continue to VAADRO Portal</p>
        </div>

        <div className="divide-y divide-gray-100 border-y border-gray-100 my-4">
          {accounts.map((acc) => (
            <button
              key={acc.email}
              onClick={() => handleSelectAccount(acc)}
              disabled={loadingUser !== null}
              className="w-full py-3 px-2 flex items-center gap-3 hover:bg-blue-50/60 rounded-lg text-left transition group"
            >
              <img
                src={acc.avatar}
                alt={acc.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 truncate">
                  {acc.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{acc.email}</p>
              </div>
              {loadingUser === acc.email && (
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              )}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          To continue, Google will share your name, email address, and profile picture with VAADRO.
        </p>
      </div>
    </div>
  )
}

