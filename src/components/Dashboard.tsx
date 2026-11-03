import React, { useState } from 'react'
import {
  CalendarDays,
  Users,
  Package,
  Layers,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  Crown,
  Bell,
  ShoppingCart,
  CheckCircle,
  Clock,
  Truck,
  Eye,
  Zap,
  Check,
  X,
  ChevronDown,
  Calendar,
  ArrowRight,
  Plus,
  Download,
  Droplet,
  FileText,
  UserCheck,
  Search,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react'

interface DashboardProps {
  user: {
    identifier: string
    name?: string
  }
  onLogout: () => void
}

interface OrderItem {
  id: string
  customer: string
  contact: string
  qty: string
  bottlesCount: number
  bottleType: '500ml' | '1L' | '20L'
  status: 'Approved' | 'Pending' | 'Delivered' | 'Rejected'
  date: string
  timeAgo: string
  amount: string
  address: string
}

interface CustomerItem {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  city: string
  ordersCount: number
  totalSpent: string
  status: 'Active' | 'Pending'
}

interface ProductItem {
  id: string
  name: string
  size: string
  price: string
  casePack: string
  stockUnits: number
  tdsLevel: string
  phLevel: string
  badge: string
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  // Navigation active tab: 'dashboard' | 'orders' | 'approvals' | 'customers' | 'products' | 'inventory' | 'reports' | 'users' | 'settings'
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chartPeriod, setChartPeriod] = useState<'month' | '3months' | '6months'>('month')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  // Search & Filter state for Orders
  const [orderSearchQuery, setOrderSearchQuery] = useState('')
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Delivered' | 'Rejected'>('All')

  // Dynamic Metric Counts
  const [stats, setStats] = useState({
    totalOrders: 124,
    approvedOrders: 98,
    pendingApproval: 18,
    deliveredOrders: 96
  })

  // Orders State (Master List)
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '#ORD-20261031-004',
      customer: 'Royal Infratech',
      contact: '+91 98290 12345',
      qty: '25 Bottles (1L)',
      bottlesCount: 25,
      bottleType: '1L',
      status: 'Approved',
      date: '31 Oct 2026, 11:45 AM',
      timeAgo: '15 min ago',
      amount: '₹750',
      address: 'Civil Lines, Delhi Road, Jaipur, Rajasthan'
    },
    {
      id: '#ORD-20261031-003',
      customer: 'Skyline Group',
      contact: '+91 98765 43210',
      qty: '50 Bottles (500ml)',
      bottlesCount: 50,
      bottleType: '500ml',
      status: 'Pending',
      date: '31 Oct 2026, 10:30 AM',
      timeAgo: '10 min ago',
      amount: '₹1,000',
      address: 'Skyline Heights, Golf Course Road, Gurugram'
    },
    {
      id: '#ORD-20261031-002',
      customer: 'Tech Solutions',
      contact: '+91 94140 88990',
      qty: '10 Bottles (1L)',
      bottlesCount: 10,
      bottleType: '1L',
      status: 'Approved',
      date: '31 Oct 2026, 09:20 AM',
      timeAgo: '5 min ago',
      amount: '₹300',
      address: 'Tower B, Cyber City, DLF Phase 2, Gurugram'
    },
    {
      id: '#ORD-20261031-001',
      customer: 'ABC Industries',
      contact: '+91 98280 55443',
      qty: '20 Bottles (500ml)',
      bottlesCount: 20,
      bottleType: '500ml',
      status: 'Delivered',
      date: '31 Oct 2026, 08:50 AM',
      timeAgo: '2 hours ago',
      amount: '₹400',
      address: 'Plot 42, Industrial Area, Sector 58, Gurugram'
    },
    {
      id: '#ORD-20261030-019',
      customer: 'Apex Hotel & Suites',
      contact: '+91 99887 76655',
      qty: '100 Bottles (500ml)',
      bottlesCount: 100,
      bottleType: '500ml',
      status: 'Delivered',
      date: '30 Oct 2026, 04:15 PM',
      timeAgo: 'Yesterday',
      amount: '₹2,000',
      address: 'MI Road, Near Panch Batti, Jaipur'
    },
    {
      id: '#ORD-20261030-018',
      customer: 'Maharaja Convention Center',
      contact: '+91 91234 56789',
      qty: '40 Jars (20L Cans)',
      bottlesCount: 40,
      bottleType: '20L',
      status: 'Delivered',
      date: '30 Oct 2026, 02:00 PM',
      timeAgo: 'Yesterday',
      amount: '₹3,600',
      address: 'Sitapura Industrial Area, Tonk Road, Jaipur'
    }
  ])

  // Customers Directory State
  const [customers] = useState<CustomerItem[]>([
    {
      id: 'CUST-001',
      name: 'ABC Industries Ltd.',
      contactPerson: 'Mr. Rajesh Sharma',
      phone: '+91 98280 55443',
      email: 'procurement@abcindustries.in',
      city: 'Gurugram',
      ordersCount: 34,
      totalSpent: '₹48,500',
      status: 'Active'
    },
    {
      id: 'CUST-002',
      name: 'Skyline Commercial Group',
      contactPerson: 'Ms. Priya Verma',
      phone: '+91 98765 43210',
      email: 'admin@skylinegroup.com',
      city: 'Delhi NCR',
      ordersCount: 28,
      totalSpent: '₹62,000',
      status: 'Active'
    },
    {
      id: 'CUST-003',
      name: 'Tech Solutions Hub',
      contactPerson: 'Mr. Amit Jain',
      phone: '+91 94140 88990',
      email: 'office@techsolutions.com',
      city: 'Gurugram',
      ordersCount: 19,
      totalSpent: '₹24,800',
      status: 'Active'
    },
    {
      id: 'CUST-004',
      name: 'Royal Infratech Ltd.',
      contactPerson: 'Col. Sanjeev Rathore',
      phone: '+91 98290 12345',
      email: 'admin@royalinfratech.com',
      city: 'Jaipur',
      ordersCount: 42,
      totalSpent: '₹89,200',
      status: 'Active'
    },
    {
      id: 'CUST-005',
      name: 'Apex Luxury Hotel',
      contactPerson: 'Chef Kunal Deshmukh',
      phone: '+91 99887 76655',
      email: 'hospitality@apexhotel.com',
      city: 'Jaipur',
      ordersCount: 56,
      totalSpent: '₹1,12,000',
      status: 'Active'
    }
  ])

  // Products Catalog State
  const [products] = useState<ProductItem[]>([
    {
      id: 'PROD-500ML',
      name: 'VAADRO Packaged Drinking Water 500ml',
      size: '500 ml',
      price: '₹20 / Unit',
      casePack: 'Box of 24 Bottles',
      stockUnits: 4850,
      tdsLevel: '110 PPM',
      phLevel: '7.2 pH (Balanced)',
      badge: 'Best Seller'
    },
    {
      id: 'PROD-1000ML',
      name: 'VAADRO Pure Mineral Water 1 Litre',
      size: '1000 ml (1L)',
      price: '₹30 / Unit',
      casePack: 'Box of 12 Bottles',
      stockUnits: 3200,
      tdsLevel: '115 PPM',
      phLevel: '7.4 pH',
      badge: 'Family Pack'
    },
    {
      id: 'PROD-20LITRE',
      name: 'VAADRO Commercial Dispenser Jar 20L',
      size: '20 Litres',
      price: '₹90 / Refill',
      casePack: 'Returnable Multi-trip Jar',
      stockUnits: 940,
      tdsLevel: '105 PPM',
      phLevel: '7.2 pH',
      badge: 'Corporate Standard'
    },
    {
      id: 'PROD-250ML',
      name: 'VAADRO Eco-Cup Water Pack 250ml',
      size: '250 ml',
      price: '₹10 / Unit',
      casePack: 'Crate of 48 Units',
      stockUnits: 1800,
      tdsLevel: '110 PPM',
      phLevel: '7.1 pH',
      badge: 'Events & Conferences'
    }
  ])

  // Stock inventory levels
  const [inventoryStock, setInventoryStock] = useState({
    bottles500ml: 4850,
    bottles1L: 3200,
    bottles20L: 940,
    capsAndSeals: 15400,
    rawWaterLiters: 85000,
    roTreatedLiters: 74200
  })

  // System Settings State
  const [plantSettings, setPlantSettings] = useState({
    plantName: 'VAADRO Bottling Plant #1',
    location: 'Sitapura Industrial Area, Jaipur, Rajasthan',
    licenseNo: 'FSSAI Lic. No. 10020013000452 / BIS CM/L-8400012',
    targetTDS: '110 PPM',
    autoApproveDistributorOrders: false,
    lowStockAlertThreshold: 500,
    managerEmail: 'plant.admin@vaadro.com'
  })

  // Helper: Toast
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Handle Order Approval
  const handleApproveOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Approved' } : o))
    )
    setStats((prev) => ({
      ...prev,
      approvedOrders: prev.approvedOrders + 1,
      pendingApproval: Math.max(0, prev.pendingApproval - 1)
    }))
    showToast(`Order ${orderId} approved successfully!`)
  }

  // Handle Order Rejection
  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Rejected' } : o))
    )
    setStats((prev) => ({
      ...prev,
      pendingApproval: Math.max(0, prev.pendingApproval - 1)
    }))
    showToast(`Order ${orderId} was rejected.`)
  }

  // Filtered orders for the Orders List view
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(orderSearchQuery.toLowerCase())
    const matchesStatus =
      orderStatusFilter === 'All' ? true : order.status === orderStatusFilter
    return matchesSearch && matchesStatus
  })

  // Pending orders list for Approval tab & Dashboard
  const pendingOrdersList = orders.filter((o) => o.status === 'Pending')

  // Chart Data based on selected period
  const chartPoints = {
    month: {
      total: [35, 76, 61, 88, 98],
      approved: [25, 59, 45, 72, 82],
      delivered: [15, 40, 25, 47, 62],
      labels: ['1 Oct', '7 Oct', '14 Oct', '21 Oct', '31 Oct']
    },
    '3months': {
      total: [45, 68, 85, 94, 110],
      approved: [38, 55, 70, 80, 92],
      delivered: [30, 48, 62, 75, 88],
      labels: ['Aug', 'Late Aug', 'Sep', 'Late Sep', 'Oct']
    },
    '6months': {
      total: [30, 52, 70, 85, 124],
      approved: [25, 42, 60, 75, 98],
      delivered: [20, 38, 52, 68, 96],
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    }
  }[chartPeriod]

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f0f4f9] font-sans select-none">
      {/* ============================================================== */}
      {/* 1. LEFT SIDEBAR (Dark Royal Blue with Active Blue Pill State)  */}
      {/* ============================================================== */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[210px] xl:w-[220px] bg-gradient-to-b from-[#012d6a] via-[#01275d] to-[#011c42] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } shadow-2xl lg:shadow-none flex-shrink-0`}
      >
        {/* Top: VAADRO Brand Logo */}
        <div>
          <div className="p-4 pt-5 pb-4 flex flex-col items-center border-b border-white/10">
            <div className="w-9 h-11 mb-1">
              <svg viewBox="0 0 40 46" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="sideDropletGrad" x1="6" y1="4" x2="34" y2="42" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 3C20 3 6 18.5 6 29C6 36.732 12.268 43 20 43C27.732 43 34 36.732 34 29C34 18.5 20 3 20 3Z"
                  fill="url(#sideDropletGrad)"
                />
                <path
                  d="M20 12C20 12 11 23 11 30C11 35 15 39 20 39C25 39 29 35 29 30C29 23 20 12 20 12Z"
                  fill="#012d6a"
                />
                <path
                  d="M20 18C20 18 15 26 15 30.5C15 33.5 17.2 36 20 36C22.8 36 25 33.5 25 30.5C25 26 20 18 20 18Z"
                  fill="url(#sideDropletGrad)"
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

          {/* Navigation Menu Items with proper Active Blue Pill State */}
          <nav className="p-2 space-y-0.5 mt-2 text-[13px]">
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

            {/* 2. Orders (with badge count) */}
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
                <CalendarDays className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="bg-[#0084ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingOrdersList.length}
              </span>
            </button>

            {/* 3. Approvals */}
            <button
              onClick={() => {
                setActiveTab('approvals')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'approvals'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Approvals</span>
              </div>
              {pendingOrdersList.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {pendingOrdersList.length}
                </span>
              )}
            </button>

            {/* 4. Customers */}
            <button
              onClick={() => {
                setActiveTab('customers')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            {/* 5. Products */}
            <button
              onClick={() => {
                setActiveTab('products')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </button>

            {/* 6. Inventory */}
            <button
              onClick={() => {
                setActiveTab('inventory')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Inventory</span>
            </button>

            {/* 7. Reports */}
            <button
              onClick={() => {
                setActiveTab('reports')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Reports</span>
            </button>

            {/* 8. Users */}
            <button
              onClick={() => {
                setActiveTab('users')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Users</span>
            </button>

            {/* 9. Settings */}
            <button
              onClick={() => {
                setActiveTab('settings')
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#0070f3] text-white shadow-md shadow-blue-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>

            {/* 10. Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-rose-300" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Artwork (Water Splash + Bottle) */}
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

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* ============================================================== */}
      {/* 2. MAIN CONTENT AREA (Dynamically renders active tab)          */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-50 rounded-lg text-amber-500">
                <Crown className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800 leading-tight">
                  Welcome, {user.name || 'Admin'}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Super Admin</div>
              </div>
            </div>
          </div>

          {/* Right: Notifications & Profile Dropdown */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <button
                onClick={() => {
                  setActiveTab('approvals')
                  showToast(`${pendingOrdersList.length} orders waiting for your approval!`)
                }}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition relative cursor-pointer"
                title="Pending Approvals"
              >
                <Bell className="w-4 h-4" />
                {pendingOrdersList.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {pendingOrdersList.length}
                  </span>
                )}
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#002d6b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {user.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">
                  Admin
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{user.name || 'Admin User'}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.identifier}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('settings')
                      setUserDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Facility Details
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('inventory')
                      setUserDropdownOpen(false)
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Inventory & Stock
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Body (Conditional Tab View) */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 space-y-4 max-w-[1500px] w-full mx-auto">
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD (Screenshot 1:1 View)                         */}
          {/* ============================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Header Title & Water Splash Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-xs">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#0c2340] tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                      Overview of your VAADRO facility & orders
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <img
                    src="/assets/dashboard-splash.png"
                    alt="Pure Water • Healthy Tomorrow"
                    className="hidden md:block h-10 w-auto object-contain opacity-95"
                  />
                  <button
                    onClick={() => showToast('Date range: 01 Oct 2026 - 31 Oct 2026')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer shadow-2xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>01 Oct 2026 - 31 Oct 2026</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* 4 Colorful Wave Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div 
                  onClick={() => setActiveTab('orders')}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0062d2] to-[#0284c7] text-white p-4 shadow-md shadow-blue-500/15 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      ↑ 12%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {stats.totalOrders}
                    </div>
                    <div className="text-xs text-sky-100 font-medium">Total Orders</div>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-6 opacity-30">
                    <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-full fill-white">
                      <path d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z" />
                    </svg>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setOrderStatusFilter('Approved')
                    setActiveTab('orders')
                  }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#059669] to-[#10b981] text-white p-4 shadow-md shadow-emerald-500/15 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      ↑ 15%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {stats.approvedOrders}
                    </div>
                    <div className="text-xs text-emerald-100 font-medium">Approved Orders</div>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-6 opacity-30">
                    <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-full fill-white">
                      <path d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z" />
                    </svg>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('approvals')}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ea580c] to-[#f59e0b] text-white p-4 shadow-md shadow-amber-500/15 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      ↑ 5%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {pendingOrdersList.length}
                    </div>
                    <div className="text-xs text-amber-100 font-medium">Pending Approval</div>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-6 opacity-30">
                    <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-full fill-white">
                      <path d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z" />
                    </svg>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setOrderStatusFilter('Delivered')
                    setActiveTab('orders')
                  }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c3aed] to-[#8b5cf6] text-white p-4 shadow-md shadow-purple-500/15 cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      ↑ 10%
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {stats.deliveredOrders}
                    </div>
                    <div className="text-xs text-purple-100 font-medium">Delivered Orders</div>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-6 opacity-30">
                    <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-full fill-white">
                      <path d="M0,25 C150,50 350,0 500,25 L500,50 L0,50 Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Middle Row: Orders Overview Chart + Pending Approval List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Orders Overview Chart */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                        Orders Overview
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                      <button
                        onClick={() => setChartPeriod('month')}
                        className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                          chartPeriod === 'month'
                            ? 'bg-[#0066cc] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        This Month
                      </button>
                      <button
                        onClick={() => setChartPeriod('3months')}
                        className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                          chartPeriod === '3months'
                            ? 'bg-[#0066cc] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Last 3 Months
                      </button>
                      <button
                        onClick={() => setChartPeriod('6months')}
                        className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                          chartPeriod === '6months'
                            ? 'bg-[#0066cc] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Last 6 Months
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-4 py-2.5 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0066cc]"></span>
                      Total Orders
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                      Approved
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"></span>
                      Delivered
                    </span>
                  </div>

                  <div className="w-full h-[220px] relative mt-1">
                    <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {[0, 25, 50, 75, 100].map((val) => {
                        const y = 180 - (val / 100) * 150
                        return (
                          <g key={val}>
                            <text x="5" y={y + 4} fontSize="9" fill="#94a3b8" textAnchor="start">
                              {val}
                            </text>
                            <line x1="30" y1={y} x2="490" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                          </g>
                        )
                      })}

                      {/* Total Orders Curve */}
                      <path
                        d={`M 40,${180 - (chartPoints.total[0] / 100) * 150} 
                            C 120,${180 - (chartPoints.total[1] / 100) * 150 - 15} 
                              180,${180 - (chartPoints.total[2] / 100) * 150 + 20} 
                              260,${180 - (chartPoints.total[2] / 100) * 150} 
                            S 380,${180 - (chartPoints.total[3] / 100) * 150} 
                              480,${180 - (chartPoints.total[4] / 100) * 150}`}
                        fill="none"
                        stroke="#0066cc"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Approved Orders Curve */}
                      <path
                        d={`M 40,${180 - (chartPoints.approved[0] / 100) * 150} 
                            C 120,${180 - (chartPoints.approved[1] / 100) * 150 - 10} 
                              180,${180 - (chartPoints.approved[2] / 100) * 150 + 15} 
                              260,${180 - (chartPoints.approved[2] / 100) * 150} 
                            S 380,${180 - (chartPoints.approved[3] / 100) * 150} 
                              480,${180 - (chartPoints.approved[4] / 100) * 150}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Delivered Curve */}
                      <path
                        d={`M 40,${180 - (chartPoints.delivered[0] / 100) * 150} 
                            C 120,${180 - (chartPoints.delivered[1] / 100) * 150} 
                              180,${180 - (chartPoints.delivered[2] / 100) * 150 + 10} 
                              260,${180 - (chartPoints.delivered[2] / 100) * 150} 
                            S 380,${180 - (chartPoints.delivered[3] / 100) * 150} 
                              480,${180 - (chartPoints.delivered[4] / 100) * 150} 
                            L 480,180 L 40,180 Z`}
                        fill="url(#purpleAreaGrad)"
                      />
                      <path
                        d={`M 40,${180 - (chartPoints.delivered[0] / 100) * 150} 
                            C 120,${180 - (chartPoints.delivered[1] / 100) * 150} 
                              180,${180 - (chartPoints.delivered[2] / 100) * 150 + 10} 
                              260,${180 - (chartPoints.delivered[2] / 100) * 150} 
                            S 380,${180 - (chartPoints.delivered[3] / 100) * 150} 
                              480,${180 - (chartPoints.delivered[4] / 100) * 150}`}
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {[0, 1, 2, 3, 4].map((i) => {
                        const x = 40 + i * 110
                        return (
                          <g key={i}>
                            <circle
                              cx={x}
                              cy={180 - (chartPoints.total[i] / 100) * 150}
                              r="4"
                              fill="#0066cc"
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            <circle
                              cx={x}
                              cy={180 - (chartPoints.approved[i] / 100) * 150}
                              r="4"
                              fill="#10b981"
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            <circle
                              cx={x}
                              cy={180 - (chartPoints.delivered[i] / 100) * 150}
                              r="4"
                              fill="#8b5cf6"
                              stroke="#ffffff"
                              strokeWidth="2"
                            />
                            <text x={x} y="196" fontSize="9.5" fill="#64748b" textAnchor="middle">
                              {chartPoints.labels[i]}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </div>

                {/* Pending Approval List */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      <Bell className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                        Pending Approval
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 my-1 space-y-1">
                    {pendingOrdersList.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 text-xs">
                        <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                        All pending orders have been processed!
                      </div>
                    ) : (
                      pendingOrdersList.slice(0, 3).map((order) => (
                        <div key={order.id} className="py-2.5 flex items-center justify-between gap-2 hover:bg-slate-50/70 p-2 rounded-xl transition">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5 flex-shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-800">{order.id}</span>
                                <span className="text-[10px] text-slate-400">{order.timeAgo}</span>
                              </div>
                              <p className="text-xs text-slate-600 font-medium truncate">
                                Customer: <strong className="text-slate-800">{order.customer}</strong>
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Order: {order.qty}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => handleApproveOrder(order.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer"
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRejectOrder(order.id)}
                              className="flex items-center gap-1 px-2 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold transition cursor-pointer"
                            >
                              <X className="w-3 h-3 stroke-[3]" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Auto-refresh enabled (30s)</span>
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="text-blue-600 font-medium hover:underline cursor-pointer"
                    >
                      Open Approval Queue →
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Orders Table + Quick Actions Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Recent Orders Table */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                        Recent Orders
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto my-2">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold">
                          <th className="py-2.5 px-2">Order ID</th>
                          <th className="py-2.5 px-2">Customer Name</th>
                          <th className="py-2.5 px-2">Order Qty</th>
                          <th className="py-2.5 px-2">Status</th>
                          <th className="py-2.5 px-2">Order Date</th>
                          <th className="py-2.5 px-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {orders.slice(0, 4).map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-2.5 px-2 font-bold text-slate-800">{order.id}</td>
                            <td className="py-2.5 px-2 font-medium">{order.customer}</td>
                            <td className="py-2.5 px-2">{order.qty}</td>
                            <td className="py-2.5 px-2">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  order.status === 'Approved'
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : order.status === 'Pending'
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : order.status === 'Delivered'
                                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                    : 'bg-rose-100 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-slate-500 text-[11px] whitespace-nowrap">
                              {order.date}
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center justify-center cursor-pointer"
                                title="View Order Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Showing 4 most recent plant dispatches</span>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                      View all {orders.length} orders →
                    </button>
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#0066cc]" />
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">
                        Quick Actions
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-2">
                    <button
                      onClick={() => setActiveTab('approvals')}
                      className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                        Approve Orders
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {pendingOrdersList.length} Waiting
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('inventory')}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/30 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">
                        Manage Stock
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Inventory Levels</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('reports')}
                      className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/30 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <BarChart2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                        View Reports
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Analytics & PDF</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('users')}
                      className="p-4 rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/30 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 group-hover:text-sky-700">
                        Manage Users
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Access Control</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsNewOrderModalOpen(true)}
                    className="w-full mt-2 bg-[#0066cc] hover:bg-[#0052a3] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Commercial Water Order</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: ORDERS MANAGEMENT VIEW (Full Order List)                */}
          {/* ============================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Orders Directory</h1>
                  <p className="text-xs text-slate-500">Manage, track and dispatch all client & distributor water orders</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNewOrderModalOpen(true)}
                    className="px-4 py-2 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Create Order
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by Order ID, Customer or Location..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                  {(['All', 'Pending', 'Approved', 'Delivered', 'Rejected'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                        orderStatusFilter === st
                          ? 'bg-[#0066cc] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400">
                            No orders found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4 font-bold text-slate-900">{order.id}</td>
                            <td className="py-3 px-4 font-semibold">{order.customer}</td>
                            <td className="py-3 px-4 text-slate-500">{order.contact}</td>
                            <td className="py-3 px-4 font-medium">{order.qty}</td>
                            <td className="py-3 px-4 font-bold text-blue-600">{order.amount}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  order.status === 'Approved'
                                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                    : order.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                    : order.status === 'Delivered'
                                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                                    : 'bg-rose-100 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{order.date}</td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition inline-flex items-center justify-center cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: APPROVALS QUEUE                                         */}
          {/* ============================================================== */}
          {activeTab === 'approvals' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Pending Approvals Queue</h1>
                  <p className="text-xs text-slate-500">Commercial bulk orders requiring facility authorization before bottling and dispatch</p>
                </div>
                {pendingOrdersList.length > 0 && (
                  <button
                    onClick={() => {
                      pendingOrdersList.forEach((o) => handleApproveOrder(o.id))
                      showToast('All pending orders approved in batch!')
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve All ({pendingOrdersList.length})
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingOrdersList.length === 0 ? (
                  <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No Pending Approvals!</h3>
                    <p className="text-xs text-slate-500 mt-1">All commercial orders are verified and ready for logistics.</p>
                  </div>
                ) : (
                  pendingOrdersList.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-800">{order.id}</span>
                          <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                            {order.timeAgo}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{order.customer}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{order.address}</p>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-400 block text-[10px]">ORDER BATCH</span>
                            <span className="font-bold text-slate-800">{order.qty}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-400 block text-[10px]">TOTAL VALUE</span>
                            <span className="font-extrabold text-blue-600 text-sm">{order.amount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleApproveOrder(order.id)}
                          className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="flex-1 bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 stroke-[3]" /> Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CUSTOMERS & DISTRIBUTORS                                */}
          {/* ============================================================== */}
          {activeTab === 'customers' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Distributor & Corporate Customers</h1>
                  <p className="text-xs text-slate-500">Official commercial clients, hotels and retail distributors</p>
                </div>
                <button
                  onClick={() => showToast('Add customer form initiated')}
                  className="px-4 py-2 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Partner
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers.map((cust) => (
                  <div key={cust.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {cust.id}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {cust.status} Partner
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{cust.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-slate-400" /> {cust.contactPerson}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{cust.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{cust.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{cust.city} Facility Hub</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">TOTAL DISPATCHES</span>
                        <span className="font-bold text-slate-800">{cust.ordersCount} Orders</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">TOTAL VALUE</span>
                        <span className="font-bold text-emerald-600">{cust.totalSpent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: PRODUCTS CATALOG                                         */}
          {/* ============================================================== */}
          {activeTab === 'products' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">VAADRO® Packaged Water Products</h1>
                  <p className="text-xs text-slate-500">Certified multi-stage purified bottled water SKUs & packaging specifications</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-200">
                    BIS CM/L-8400012 Certified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                          {prod.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{prod.size}</span>
                      </div>

                      <div className="w-16 h-28 mx-auto my-2 flex items-center justify-center">
                        <Droplet className="w-16 h-16 text-[#0066cc] fill-[#0066cc]/10" />
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-sm mt-2 text-center">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 text-center mt-1">{prod.casePack}</p>

                      <div className="my-3 py-2 border-y border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">TDS Purity</span>
                          <span className="font-bold text-slate-800">{prod.tdsLevel}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">pH Level</span>
                          <span className="font-bold text-emerald-600">{prod.phLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block">RETAIL PRICE</span>
                        <span className="font-extrabold text-[#0066cc] text-sm">{prod.price}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {prod.stockUnits} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: INVENTORY & WAREHOUSE STOCK                             */}
          {/* ============================================================== */}
          {activeTab === 'inventory' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Plant Inventory & Water Processing</h1>
                  <p className="text-xs text-slate-500">Live packaged stock, raw reservoir and RO-treated mineral buffer storage</p>
                </div>
                <button
                  onClick={() => {
                    setInventoryStock((p) => ({
                      ...p,
                      bottles500ml: p.bottles500ml + 500,
                      bottles1L: p.bottles1L + 250,
                      bottles20L: p.bottles20L + 50
                    }))
                    showToast('Production batch updated: +800 bottled units added!')
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Log Production Batch
                </button>
              </div>

              {/* Water Buffers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-sky-500 to-blue-700 text-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-100">RO Treated Pure Buffer</span>
                    <Droplet className="w-5 h-5 text-sky-200" />
                  </div>
                  <div className="text-3xl font-black mt-2">{inventoryStock.roTreatedLiters.toLocaleString()} Litres</div>
                  <p className="text-xs text-sky-100 mt-1">Multi-stage UV sterilization + Ozonation ready for bottling line</p>
                </div>

                <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Raw Source Reservoir</span>
                    <Layers className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-3xl font-black mt-2">{inventoryStock.rawWaterLiters.toLocaleString()} Litres</div>
                  <p className="text-xs text-slate-300 mt-1">Natural underground aquifer inlet capacity</p>
                </div>
              </div>

              {/* Finished Goods Inventory Table */}
              <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-xs">
                <h3 className="font-extrabold text-slate-800 text-sm mb-3">Finished Packaged Goods</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-xs text-slate-500">500ml Bottled Packs</div>
                    <div className="text-2xl font-black text-[#0066cc] mt-1">{inventoryStock.bottles500ml} Bottles</div>
                    <p className="text-[11px] text-slate-400 mt-1">Approx 202 Carton Boxes</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-xs text-slate-500">1 Litre Mineral Packs</div>
                    <div className="text-2xl font-black text-[#0066cc] mt-1">{inventoryStock.bottles1L} Bottles</div>
                    <p className="text-[11px] text-slate-400 mt-1">Approx 266 Carton Boxes</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-xs text-slate-500">20L Commercial Cans</div>
                    <div className="text-2xl font-black text-[#0066cc] mt-1">{inventoryStock.bottles20L} Jars</div>
                    <p className="text-[11px] text-slate-400 mt-1">Corporate Dispensers</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: REPORTS & ANALYTICS                                     */}
          {/* ============================================================== */}
          {activeTab === 'reports' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Production & Financial Reports</h1>
                  <p className="text-xs text-slate-500">Download water purity compliance logs, dispatch statements and revenue analytics</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => showToast('Downloading Water Purity Audit PDF...')}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Purity Audit PDF
                  </button>
                  <button
                    onClick={() => showToast('Exporting October Dispatch Excel sheet...')}
                    className="px-3.5 py-2 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <FileSpreadsheet className="w-4 h-4" /> Export Excel
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
                    <ShieldCheck className="w-4 h-4" /> Lab Water Quality
                  </div>
                  <div className="text-2xl font-black text-slate-900">100% Passed</div>
                  <p className="text-xs text-slate-500">Certified zero pathogen, heavy metals free, balanced TDS.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                    <Truck className="w-4 h-4" /> Monthly Volume Dispatched
                  </div>
                  <div className="text-2xl font-black text-slate-900">1,48,200 Litres</div>
                  <p className="text-xs text-slate-500">Delivered across 12 commercial logistics routes.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase">
                    <BarChart2 className="w-4 h-4" /> Total Monthly Turnover
                  </div>
                  <div className="text-2xl font-black text-slate-900">₹8,92,400</div>
                  <p className="text-xs text-slate-500">Includes wholesale distributor and corporate supply contracts.</p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: USERS & TEAM MANAGEMENT                                 */}
          {/* ============================================================== */}
          {activeTab === 'users' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                <div>
                  <h1 className="text-xl font-extrabold text-[#0c2340]">Facility Staff & Delivery Drivers</h1>
                  <p className="text-xs text-slate-500">Plant managers, quality technicians and distribution fleet operators</p>
                </div>
                <button
                  onClick={() => showToast('New staff member invitation link copied!')}
                  className="px-4 py-2 bg-[#0066cc] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Invite Staff
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Gaurav Dubey', role: 'Owner & Managing Director', email: 'owner@vaadro.com', phone: '+91 98290 00001', tag: 'Executive' },
                  { name: 'Dr. Vivek Saxena', role: 'Chief Water Quality Chemist', email: 'lab@vaadro.com', phone: '+91 98290 00002', tag: 'Quality Lab' },
                  { name: 'Ramesh Singh', role: 'Plant Operations Supervisor', email: 'operations@vaadro.com', phone: '+91 98290 00003', tag: 'Plant Ops' },
                  { name: 'Sanjay Rawat', role: 'Fleet Logistics Manager', email: 'logistics@vaadro.com', phone: '+91 98290 00004', tag: 'Logistics' },
                  { name: 'Mohan Kumar', role: 'Lead Bottling Line Technician', email: 'tech1@vaadro.com', phone: '+91 98290 00005', tag: 'Maintenance' },
                  { name: 'Sunil Yadav', role: 'Commercial Dispatch Driver #1', email: 'driver1@vaadro.com', phone: '+91 98290 00006', tag: 'Fleet' },
                ].map((member, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066cc] font-extrabold flex items-center justify-center text-sm">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">{member.name}</h4>
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                          {member.tag}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <p className="font-medium text-slate-800">{member.role}</p>
                      <p className="text-slate-500">{member.email}</p>
                      <p className="text-slate-500">{member.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: SETTINGS                                                */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs max-w-2xl">
                <h1 className="text-xl font-extrabold text-[#0c2340] mb-1">Facility & Plant Configuration</h1>
                <p className="text-xs text-slate-500 mb-6">Manage official bottling facility details and automated alerts</p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Facility Name</label>
                    <input
                      type="text"
                      value={plantSettings.plantName}
                      onChange={(e) => setPlantSettings({ ...plantSettings, plantName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Plant Location</label>
                    <input
                      type="text"
                      value={plantSettings.location}
                      onChange={(e) => setPlantSettings({ ...plantSettings, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Certifications & License</label>
                    <input
                      type="text"
                      value={plantSettings.licenseNo}
                      onChange={(e) => setPlantSettings({ ...plantSettings, licenseNo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Mineral TDS (PPM)</label>
                    <input
                      type="text"
                      value={plantSettings.targetTDS}
                      onChange={(e) => setPlantSettings({ ...plantSettings, targetTDS: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button
                    onClick={() => showToast('Plant configuration saved successfully!')}
                    className="bg-[#0066cc] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition cursor-pointer mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* 3. MODALS & POPUPS                                             */}
      {/* ============================================================== */}

      {/* Modal A: Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 text-[#0066cc] rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedOrder.id}</h3>
                <p className="text-xs text-slate-500">{selectedOrder.date}</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-800">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="font-medium text-slate-700">{selectedOrder.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order Quantity:</span>
                <span className="font-bold text-slate-800">{selectedOrder.qty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Invoice Amount:</span>
                <span className="font-bold text-[#0066cc] text-sm">{selectedOrder.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-700 text-right max-w-xs">
                  {selectedOrder.address}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-500">Status:</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={() => {
                  showToast(`Invoice for ${selectedOrder.id} downloaded!`)
                  setSelectedOrder(null)
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Invoice PDF
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

      {/* Modal B: Create New Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">Create Commercial Order</h3>
            <p className="text-xs text-slate-500 mb-4">Dispatch water containers to client location</p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target as HTMLFormElement
                const client = (form.elements.namedItem('client') as HTMLInputElement).value
                const qty = (form.elements.namedItem('qty') as HTMLInputElement).value
                const bottleType = (form.elements.namedItem('bottleType') as HTMLSelectElement).value as '500ml' | '1L' | '20L'

                const newOrder: OrderItem = {
                  id: `#ORD-20261031-${Math.floor(100 + Math.random() * 900)}`,
                  customer: client,
                  contact: '+91 98000 11223',
                  qty: `${qty} Bottles (${bottleType})`,
                  bottlesCount: parseInt(qty) || 20,
                  bottleType: bottleType,
                  status: 'Pending',
                  date: 'Just now',
                  timeAgo: 'Just now',
                  amount: `₹${(parseInt(qty) || 20) * (bottleType === '20L' ? 90 : bottleType === '1L' ? 30 : 20)}`,
                  address: 'Commercial Logistics Terminal 1, Industrial Hub'
                }

                setOrders((prev) => [newOrder, ...prev])
                setStats((prev) => ({
                  ...prev,
                  totalOrders: prev.totalOrders + 1,
                  pendingApproval: prev.pendingApproval + 1
                }))

                setIsNewOrderModalOpen(false)
                showToast(`Order ${newOrder.id} created for ${client}!`)
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Distributor Name
                </label>
                <input
                  name="client"
                  required
                  placeholder="e.g. Apex Corporation"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                  <input
                    name="qty"
                    type="number"
                    defaultValue={30}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Size</label>
                  <select
                    name="bottleType"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
                  >
                    <option value="500ml">500ml Pack</option>
                    <option value="1L">1 Litre Pack</option>
                    <option value="20L">20L Jar</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066cc] hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs transition mt-2 cursor-pointer"
              >
                Submit & Dispatch Order
              </button>
            </form>
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
