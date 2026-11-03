import React from 'react'
import { CheckCircle2, LogOut, Droplets, ShieldCheck, Truck, Package, ArrowRight } from 'lucide-react'
import { VaadroLogo } from './VaadroLogo'

interface SuccessDashboardProps {
  user: {
    identifier: string
    name?: string
  }
  onLogout: () => void
}

export const SuccessDashboard: React.FC<SuccessDashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-700/80 gap-4">
          <div className="flex items-center gap-3">
            <VaadroLogo size="sm" variant="white" />
            <div className="h-6 w-px bg-slate-600 hidden sm:block" />
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2.5 py-1 rounded-full">
              Verified Session
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-xl transition border border-slate-600/50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Welcome greeting */}
        <div className="py-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1">
              Welcome back, {user.name || user.identifier}!
            </h1>
            <p className="text-slate-400 text-sm max-w-lg">
              You are signed into your official <strong className="text-sky-300">VAADRO Packaged Drinking Water</strong> distributor & customer account.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-700/40 border border-slate-700/70 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-sky-400 mb-2">
              <Droplets className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">Water Purity Score</span>
            </div>
            <div className="text-2xl font-bold text-white">100% PURE</div>
            <p className="text-xs text-slate-400 mt-1">Multi-stage RO + UV minerals</p>
          </div>

          <div className="bg-slate-700/40 border border-slate-700/70 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">Account Status</span>
            </div>
            <div className="text-2xl font-bold text-white">Active</div>
            <p className="text-xs text-slate-400 mt-1">Verified partner access</p>
          </div>

          <div className="bg-slate-700/40 border border-slate-700/70 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Truck className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">Clean India Mission</span>
            </div>
            <div className="text-2xl font-bold text-white">Live Logistics</div>
            <p className="text-xs text-slate-400 mt-1">12 Containers in transit</p>
          </div>
        </div>

        {/* Quick action banners */}
        <div className="bg-gradient-to-r from-blue-900/60 to-sky-900/40 border border-blue-700/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 text-sky-300 rounded-xl">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Need to place a bulk mineral water order?</h4>
              <p className="text-xs text-slate-300">500ml, 1L, and 20L commercial water containers available.</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            Switch Account <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

