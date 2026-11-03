import React, { useState } from 'react'
import { X, Mail, Phone, CheckCircle2, ArrowRight, KeyRound, Loader2 } from 'lucide-react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  initialContact?: string
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  initialContact = ''
}) => {
  const [contact, setContact] = useState(initialContact)
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  if (!isOpen) return null

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contact.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
    }, 900)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1000)
  }

  const handleResetComplete = () => {
    setStep('input')
    setContact('')
    setOtp(['', '', '', ''])
    setNewPassword('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'input' && (
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Reset Password</h3>
            <p className="text-sm text-gray-500 mb-5">
              Enter your registered Email ID or Mobile number to receive a verification code.
            </p>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Email ID or Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    {contact.includes('@') ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <Phone className="w-5 h-5" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. user@vaadro.com or 9876543210"
                    className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !contact.trim()}
                className="w-full bg-[#0062d2] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div>
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Verify OTP</h3>
            <p className="text-sm text-gray-500 mb-4">
              We've sent a 4-digit code to <span className="font-semibold text-gray-800">{contact}</span>.
              (Hint: Enter <span className="text-blue-600 font-bold">1 2 3 4</span>)
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-between gap-3 my-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value
                      const newOtp = [...otp]
                      newOtp[idx] = val
                      setOtp(newOtp)
                      if (val && idx < 3) {
                        const nextInput = document.getElementById(`otp-${idx + 1}`)
                        nextInput?.focus()
                      }
                    }}
                    className="w-14 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                  Set New Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.join('').length < 4 || newPassword.length < 6}
                className="w-full bg-[#0062d2] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Confirm & Reset Password'
                )}
              </button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Password Changed!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Your password has been successfully updated. You can now login with your new credentials.
            </p>
            <button
              onClick={handleResetComplete}
              className="w-full bg-[#0062d2] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-sm"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

