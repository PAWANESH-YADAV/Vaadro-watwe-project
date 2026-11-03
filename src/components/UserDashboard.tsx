import React, { useState } from 'react'
import {
  ShoppingCart,
  Package,
  User as UserIcon,
  Bell,
  Headphones,
  LogOut,
  Menu,
  ChevronDown,
  Calendar,
  MapPin,
  Edit2,
  Clock,
  Plus,
  Minus,
  ArrowRight,
  Download,
  Droplet
} from 'lucide-react'

interface UserDashboardProps {
  user: {
    identifier: string
    name?: string
  }
  onLogout: () => void
}

interface UserOrder {
  id: string
  date: string
  product: string
  boxCount: number
  bottleSize: '500ml' | '1L' | '20L'
  bottlesTotal: number
  amount: number
  status: 'Pending Approval' | 'Delivered' | 'In Transit' | 'Cancelled'
  address: string
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  // Navigation active tab: 'dashboard' | 'book' | 'orders' | 'profile' | 'notifications' | 'support'
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null)
  const [isChangeAddressOpen, setIsChangeAddressOpen] = useState(false)

  // Order Booking Form State
  const [selectedProduct, setSelectedProduct] = useState<{
    id: '500ml' | '1L' | '20L'
    title: string
    unitPrice: number
    boxUnits: number
    label: string
  }>({
    id: '500ml',
    title: 'VAADRO Packaged Drinking Water (500ml)',
    unitPrice: 20,
    boxUnits: 24,
    label: '₹20 / Bottle'
  })

  const [quantityBoxes, setQuantityBoxes] = useState<number>(1)
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    '123, MG Road, Bangalore - 560001'
  )
  const [deliveryDate, setDeliveryDate] = useState<string>('2026-10-31')

  // Customer Profile State
  const [customerProfile, setCustomerProfile] = useState({
    name: user.name && user.name.toLowerCase() !== 'admin' ? user.name : 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: user.identifier.includes('@') ? user.identifier : 'rahul.sharma@gmail.com',
    city: 'Bangalore, Karnataka',
    preferredPayment: 'UPI / Cash on Delivery',
    memberSince: 'August 2025'
  })

  // Notifications State (Badge count 2)
  const [notifications] = useState([
    {
      id: 1,
      title: 'Order Under Review',
      msg: 'Your order #ORD-20261031-004 is submitted for plant verification.',
      time: '15 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Diwali Purity Offer',
      msg: 'Book 5+ boxes of 500ml or 1L packs and get free doorstep express delivery!',
      time: '2 hours ago',
      read: false
    }
  ])

  // Orders List State (matches screenshot)
  const [userOrders, setUserOrders] = useState<UserOrder[]>([
    {
      id: '#ORD-20261031-004',
      date: '31 Oct 2026, 10:45 AM',
      product: 'VAADRO (500ml)',
      boxCount: 1,
      bottleSize: '500ml',
      bottlesTotal: 24,
      amount: 480,
      status: 'Pending Approval',
      address: '123, MG Road, Bangalore - 560001'
    },
    {
      id: '#ORD-20261028-003',
      date: '28 Oct 2026, 02:20 PM',
      product: 'VAADRO (500ml)',
      boxCount: 2,
      bottleSize: '500ml',
      bottlesTotal: 48,
      amount: 960,
      status: 'Delivered',
      address: '123, MG Road, Bangalore - 560001'
    },
    {
      id: '#ORD-20261015-002',
      date: '15 Oct 2026, 11:30 AM',
      product: 'VAADRO (1L)',
      boxCount: 1,
      bottleSize: '1L',
      bottlesTotal: 20,
      amount: 600,
      status: 'Delivered',
      address: 'Flat 4B, Palm Grove Apts, Indiranagar, Bangalore'
    }
  ])

  // Calculation values
  const boxTotalAmount = quantityBoxes * (selectedProduct.boxUnits * selectedProduct.unitPrice)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Handle Placing Order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    const newOrder: UserOrder = {
      id: `#ORD-20261031-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Just now',
      product: `VAADRO (${selectedProduct.id})`,
      boxCount: quantityBoxes,
      bottleSize: selectedProduct.id,
      bottlesTotal: quantityBoxes * selectedProduct.boxUnits,
      amount: boxTotalAmount,
      status: 'Pending Approval',
      address: deliveryAddress
    }

    setUserOrders([newOrder, ...userOrders])
    showToast(`Order ${newOrder.id} placed successfully! Amount: ₹${boxTotalAmount}`)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f4f9] font-sans select-none">
      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (Royal Blue with General User Menu)            */}
      {/* ============================================================== */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[210px] xl:w-[220px] bg-gradient-to-b from-[#012d6a] via-[#01275d] to-[#011c42] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } shadow-2xl lg:shadow-none flex-shrink-0`}
      >
        {/* Top: Brand Logo */}
        <div>
          <div className="p-4 pt-5 pb-4 flex flex-col items-center border-b border-white/10">
            <div className="w-9 h-11 mb-1">
              <svg viewBox="0 0 40 46" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="guDropletGrad" x1="6" y1="4" x2="34" y2="42" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 3C20 3 6 18.5 6 29C6 36.732 12.268 43 20 43C27.732 43 34 36.732 34 29C34 18.5 20 3 20 3Z"
                  fill="url(#guDropletGrad)"
                />
                <path
                  d="M20 12C20 12 11 23 11 30C11 35 15 39 20 39C25 39 29 35 29 30C29 23 20 12 20 12Z"
                  fill="#012d6a"
                />
                <path
                  d="M20 18C20 18 15 26 15 30.5C15 33.5 17.2 36 20 36C22.8 36 25 33.5 25 30.5C25 26 20 18 20 18Z"
                  fill="url(#guDropletGrad)"
                />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-wide text-white">
              VAADRO<span className="text-[10px] font-bold ml-0.5 align-super">®</span>
            </span>
            <span className="text-[8px] uppercase tracking-wider text-sky-200/90 font-semibold mt-0.5">
              Packaged Drinking Water
            </span>
          </div>

          {/* Navigation Menu Items */}
          <nav className="p-2 space-y-1 mt-2 text-[13px]">
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                setActiveTab('dashboard')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="w-5 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span>Dashboard</span>
            </button>

            {/* 2. Book Order */}
            <button
              onClick={() => {
                setActiveTab('book')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Book Order</span>
            </button>

            {/* 3. My Orders */}
            <button
              onClick={() => {
                setActiveTab('orders')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className="bg-[#0084ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {userOrders.length}
              </span>
            </button>

            {/* 4. Profile */}
            <button
              onClick={() => {
                setActiveTab('profile')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>

            {/* 5. Notifications */}
            <button
              onClick={() => {
                setActiveTab('notifications')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {notifications.length}
              </span>
            </button>

            {/* 6. Support */}
            <button
              onClick={() => {
                setActiveTab('support')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Support</span>
            </button>

            {/* 7. Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-300" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Artwork (Water Bottle & Splash) */}
        <div className="relative overflow-hidden flex flex-col items-center">
          <img
            src="/assets/sidebar-bottle.png"
            alt="VAADRO Pure Water"
            className="w-full h-auto object-contain opacity-95"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* ============================================================== */}
      {/* 2. MAIN USER CONTENT AREA                                      */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Header Navbar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#002d6b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800 leading-tight">
                  Welcome, {customerProfile.name}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">General User</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('notifications')}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 space-y-4 max-w-[1500px] w-full mx-auto">
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD (Exact Match with Screenshot)                 */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Top Panoramic Hero Banner (MISSION: CLEAN INDIA) */}
              <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-sky-400/20 relative min-h-[90px] sm:min-h-[105px] bg-[#0284c7]">
                <img
                  src="/assets/gu-banner.jpg"
                  alt="VAADRO Mission Clean India Banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* 3 Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Quick Order */}
                <div
                  onClick={() => setActiveTab('book')}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Quick Order</h4>
                      <p className="text-[11px] text-slate-500">Book your VAADRO water in just a few clicks</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2. My Orders */}
                <div
                  onClick={() => setActiveTab('orders')}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">My Orders</h4>
                      <p className="text-[11px] text-slate-500">Track your orders and status</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 3. Need Help? */}
                <div
                  onClick={() => setActiveTab('support')}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Need Help?</h4>
                      <p className="text-[11px] text-slate-500">Contact support anytime</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Middle Section: Book Your Order (Left) + Your Order Summary (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Book Your Order Card (8 Cols) */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <ShoppingCart className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Book Your Order
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-3">
                      {/* Left: Input Fields (8 Cols) */}
                      <form onSubmit={handlePlaceOrder} className="md:col-span-8 space-y-3">
                        {/* Select Product */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                            <Droplet className="w-3 h-3 text-blue-600" /> Select Product
                          </label>
                          <div className="relative">
                            <select
                              value={selectedProduct.id}
                              onChange={(e) => {
                                const val = e.target.value
                                if (val === '500ml') {
                                  setSelectedProduct({
                                    id: '500ml',
                                    title: 'VAADRO Packaged Drinking Water (500ml)',
                                    unitPrice: 20,
                                    boxUnits: 24,
                                    label: '₹20 / Bottle'
                                  })
                                } else if (val === '1L') {
                                  setSelectedProduct({
                                    id: '1L',
                                    title: 'VAADRO Pure Mineral Water (1L)',
                                    unitPrice: 30,
                                    boxUnits: 20,
                                    label: '₹30 / Bottle'
                                  })
                                } else {
                                  setSelectedProduct({
                                    id: '20L',
                                    title: 'VAADRO Commercial Dispenser Jar (20L)',
                                    unitPrice: 90,
                                    boxUnits: 1,
                                    label: '₹90 / Can'
                                  })
                                }
                              }}
                              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 appearance-none pr-8 cursor-pointer"
                            >
                              <option value="500ml">VAADRO Packaged Drinking Water (500ml) - ₹20 / Bottle</option>
                              <option value="1L">VAADRO Mineral Water (1L) - ₹30 / Bottle</option>
                              <option value="20L">VAADRO 20 Litre Commercial Dispenser Jar - ₹90 / Can</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Select Quantity
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setQuantityBoxes(Math.max(1, quantityBoxes - 1))}
                                className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-4 py-2 font-bold text-xs text-slate-900 bg-white">
                                {quantityBoxes}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQuantityBoxes(quantityBoxes + 1)}
                                className="px-3 py-2 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              (Min 1 Box = {selectedProduct.boxUnits} {selectedProduct.id === '20L' ? 'Cans' : 'Bottles'})
                            </span>
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-600" /> Delivery Address
                          </label>
                          <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                            <span className="truncate">{deliveryAddress}</span>
                            <button
                              type="button"
                              onClick={() => setIsChangeAddressOpen(true)}
                              className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5 ml-2 flex-shrink-0 cursor-pointer"
                            >
                              Change Address <Edit2 className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>

                        {/* Delivery Date */}
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" /> Select Delivery Date
                          </label>
                          <input
                            type="date"
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                          />
                        </div>

                        {/* Place Order Action Button */}
                        <button
                          type="submit"
                          className="w-full bg-[#0066cc] hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Place Order →</span>
                        </button>
                      </form>

                      {/* Right: Stay Hydrated Bottle Graphic (4 Cols) */}
                      <div className="hidden md:flex md:col-span-4 items-center justify-center relative">
                        <img
                          src="/assets/gu-bottle-hydrated.jpg"
                          alt="VAADRO Stay Hydrated"
                          className="max-h-56 w-auto object-contain drop-shadow-md rounded-xl"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Your Order Summary Card (4 Cols) */}
                <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <Package className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Your Order Summary
                      </h3>
                    </div>

                    <div className="space-y-3 pt-3">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2.5">
                          <Droplet className="w-5 h-5 text-blue-600" />
                          <div>
                            <span className="font-bold text-slate-800 block">
                              VAADRO Water ({selectedProduct.id})
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {quantityBoxes} Box ({quantityBoxes * selectedProduct.boxUnits} Units)
                            </span>
                          </div>
                        </div>
                        <span className="font-extrabold text-slate-900">₹{boxTotalAmount}</span>
                      </div>

                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-800">₹{boxTotalAmount}</span>
                      </div>

                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Delivery Charges</span>
                        <span className="font-bold text-emerald-600">₹0 (Free)</span>
                      </div>
                    </div>
                  </div>

                  {/* Total Amount Box */}
                  <div className="bg-[#f0f7ff] border border-blue-200/60 p-3.5 rounded-xl flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Total Amount</span>
                    <span className="text-xl font-black text-[#0066cc]">₹{boxTotalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Recent Orders Table (Left) + Water Splash Card (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Your Recent Orders (8 Cols) */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Your Recent Orders
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto my-2">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-bold text-[11px]">
                          <th className="py-2.5 px-2">Order ID</th>
                          <th className="py-2.5 px-2">Date</th>
                          <th className="py-2.5 px-2">Product</th>
                          <th className="py-2.5 px-2">Quantity</th>
                          <th className="py-2.5 px-2">Amount</th>
                          <th className="py-2.5 px-2">Status</th>
                          <th className="py-2.5 px-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {userOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50 transition">
                            <td className="py-2.5 px-2 font-bold text-slate-900">{ord.id}</td>
                            <td className="py-2.5 px-2 text-slate-500 text-[11px] whitespace-nowrap">
                              {ord.date}
                            </td>
                            <td className="py-2.5 px-2 font-medium">{ord.product}</td>
                            <td className="py-2.5 px-2">{ord.boxCount} Box</td>
                            <td className="py-2.5 px-2 font-bold text-slate-900">₹{ord.amount}</td>
                            <td className="py-2.5 px-2">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  ord.status === 'Pending Approval'
                                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="text-blue-600 font-bold hover:underline cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Multi-stage mineral purified delivery</span>
                    <span className="text-emerald-600 font-semibold">● Guaranteed Fresh Bottling</span>
                  </div>
                </div>

                {/* VAADRO Water Splash Artwork Banner (4 Cols) */}
                <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-xs border border-sky-400/20 relative min-h-[160px] bg-[#0284c7]">
                  <img
                    src="/assets/gu-splash-card.jpg"
                    alt="VAADRO Pure Water Healthy Tomorrow"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: BOOK ORDER (Full-Page Dedicated Flow)                   */}
          {/* ============================================================== */}
          {activeTab === 'book' && (
            <div className="space-y-4 animate-fadeIn max-w-3xl mx-auto">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Book Fresh Mineral Water</h2>
                <p className="text-xs text-slate-500 mb-5">Select packaging, delivery slot and address</p>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">1. Choose Bottle Size</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: '500ml', title: '500ml Pack', desc: 'Box of 24 Units', price: '₹480/box' },
                        { id: '1L', title: '1 Litre Pack', desc: 'Box of 20 Units', price: '₹600/box' },
                        { id: '20L', title: '20L Jar', desc: 'Office Dispenser', price: '₹90/can' }
                      ].map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (item.id === '500ml') {
                              setSelectedProduct({
                                id: '500ml',
                                title: 'VAADRO Packaged Drinking Water (500ml)',
                                unitPrice: 20,
                                boxUnits: 24,
                                label: '₹20 / Bottle'
                              })
                            } else if (item.id === '1L') {
                              setSelectedProduct({
                                id: '1L',
                                title: 'VAADRO Pure Mineral Water (1L)',
                                unitPrice: 30,
                                boxUnits: 20,
                                label: '₹30 / Bottle'
                              })
                            } else {
                              setSelectedProduct({
                                id: '20L',
                                title: 'VAADRO Commercial Dispenser Jar (20L)',
                                unitPrice: 90,
                                boxUnits: 1,
                                label: '₹90 / Can'
                              })
                            }
                          }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                            selectedProduct.id === item.id
                              ? 'border-[#0066cc] bg-blue-50/50'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-sm text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.desc}</div>
                          <div className="mt-2 text-sm font-extrabold text-[#0066cc]">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">2. Number of Boxes</label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                        <button
                          type="button"
                          onClick={() => setQuantityBoxes(Math.max(1, quantityBoxes - 1))}
                          className="p-2.5 text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-5 font-bold text-sm">{quantityBoxes}</span>
                        <button
                          type="button"
                          onClick={() => setQuantityBoxes(quantityBoxes + 1)}
                          className="p-2.5 text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-slate-500">
                        Total {quantityBoxes * selectedProduct.boxUnits} bottles/units
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">3. Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">4. Delivery Date</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl flex items-center justify-between border border-blue-200/60">
                    <div>
                      <span className="text-xs text-slate-600 block">Total Payable</span>
                      <span className="text-xl font-black text-[#0066cc]">₹{boxTotalAmount}</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#0066cc] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer shadow-md"
                    >
                      Confirm Booking →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: MY ORDERS (Full History & Tracking)                      */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">My Water Orders</h2>
                  <p className="text-xs text-slate-500">Complete history and live dispatch status</p>
                </div>
                <button
                  onClick={() => setActiveTab('book')}
                  className="bg-[#0066cc] hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Book New Order
                </button>
              </div>

              <div className="space-y-3">
                {userOrders.map((ord) => (
                  <div key={ord.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">{ord.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Pending Approval'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{ord.date} • {ord.address}</p>
                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        Product: {ord.product} • {ord.boxCount} Box ({ord.bottlesTotal} units)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">TOTAL</span>
                        <span className="text-base font-black text-[#0066cc]">₹{ord.amount}</span>
                      </div>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer transition"
                      >
                        Track & Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PROFILE                                                 */}
          {/* ============================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-fadeIn max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-full bg-[#002d6b] text-white flex items-center justify-center font-black text-xl">
                    <UserIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{customerProfile.name}</h3>
                    <p className="text-xs text-slate-500">General User • Member since {customerProfile.memberSince}</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customerProfile.name}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={customerProfile.phone}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                    <input
                      type="email"
                      value={customerProfile.email}
                      onChange={(e) => setCustomerProfile({ ...customerProfile, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Default Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button
                    onClick={() => showToast('Profile updated successfully!')}
                    className="bg-[#0066cc] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer mt-2"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: NOTIFICATIONS                                           */}
          {/* ============================================================== */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-fadeIn max-w-2xl mx-auto">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h2 className="text-lg font-bold text-slate-900 mb-1">Notifications & Alerts</h2>
                <p className="text-xs text-slate-500 mb-4">Updates regarding your mineral water deliveries</p>

                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{n.title}</div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.msg}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SUPPORT & HELPLINE                                      */}
          {/* ============================================================== */}
          {activeTab === 'support' && (
            <div className="space-y-4 animate-fadeIn max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">VAADRO Customer Support</h3>
                    <p className="text-xs text-slate-500">24/7 dedicated assistance for commercial & home deliveries</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block">📞 Toll-Free Helpline</span>
                    <span className="text-blue-600 font-extrabold text-sm">1800-202-6000</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mon - Sat (8:00 AM - 9:00 PM)</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block">💬 WhatsApp Instant Support</span>
                    <span className="text-emerald-600 font-extrabold text-sm">+91 98290 00000</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Quick order tracking & queries</p>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-bold text-xs text-slate-800 mb-2">Send us a quick message</h4>
                  <textarea
                    rows={3}
                    placeholder="Describe your question or delivery issue..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={() => showToast('Support ticket #TKT-8402 submitted! Our executive will contact you.')}
                    className="mt-2 bg-[#0066cc] hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* 3. MODALS                                                      */}
      {/* ============================================================== */}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-[#0066cc] rounded-xl">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedOrder.id}</h3>
                <p className="text-xs text-slate-500">{selectedOrder.date}</p>
              </div>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-800">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Quantity:</span>
                <span className="font-bold text-slate-800">{selectedOrder.boxCount} Box ({selectedOrder.bottlesTotal} units)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-black text-[#0066cc] text-sm">₹{selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-700 text-right max-w-xs">{selectedOrder.address}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-4">
              <button
                onClick={() => {
                  showToast(`Invoice downloaded for ${selectedOrder.id}!`)
                  setSelectedOrder(null)
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Invoice
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-[#0066cc] hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Address Modal */}
      {isChangeAddressOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 relative">
            <h3 className="text-base font-bold text-slate-900 mb-2">Change Delivery Address</h3>
            <textarea
              defaultValue={deliveryAddress}
              id="newAddrInput"
              rows={3}
              className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const val = (document.getElementById('newAddrInput') as HTMLTextAreaElement)?.value
                  if (val) setDeliveryAddress(val)
                  setIsChangeAddressOpen(false)
                  showToast('Delivery address updated!')
                }}
                className="flex-1 bg-[#0066cc] text-white py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsChangeAddressOpen(false)}
                className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0c2340] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-sky-400/30 animate-bounce">
          <Droplet className="w-4 h-4 text-sky-400 fill-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
