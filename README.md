# 💧 VAADRO® Packaged Drinking Water Portal

A modern, high-fidelity, dual-role web application built with **React**, **TypeScript (`.tsx`)**, **Tailwind CSS**, and **Vite**. Faithfully recreates the visual mockups and provides 100% working functionality for both **General Users (Customers)** and **Super Admins**.

---

## 🚀 Key Features

### 1. 🔐 Pixel-Perfect Authentication Portal
- **1:1 Screenshot Match**: Clean, borderless layout with custom background artwork, vector water droplet logos, and authentic typography.
- **Dual View Modes**: Switch easily between *16:9 Landscape* view and *Split Layout (2nd Poster)*, plus a Fullscreen toggle (`⛶`).
- **Interactive Form Validation**: Accepts valid Email IDs or 10-digit Indian Mobile Numbers.
- **Password Security**: Show/Hide password toggle with Eye icon.
- **Forgot Password Flow**: Functional 3-step modal with simulated 4-digit OTP verification and password reset.
- **Social Sign-In**: Authentic Google OAuth modal picker.
- **Instant Demo Logins**:
  - 👤 **Instant Login as General User (Rahul Sharma)**
  - 👑 **Or Login as Super Admin**

---

### 2. 👤 General User ("GU") Customer Dashboard
Designed for end customers and retail clients (Rahul Sharma):
- **Panoramic Hero Banner**: Features *"MISSION: CLEAN INDIA"* and *"Pure Water • Healthy Tomorrow"*.
- **Quick Action Cards**: One-click shortcuts for *Quick Order*, *My Orders*, and *Need Help?*.
- **Live Booking System (`Book Your Order`)**:
  - Select Packaging: **500ml Pack** (₹20/bottle), **1 Litre Pack** (₹30/bottle), or **20 Litre Dispenser Jar** (₹90/can).
  - Quantity counter with minimum box calculation.
  - Delivery address with editable modal (`123, MG Road, Bangalore`).
  - Delivery date picker.
  - Interactive *Place Order →* button with instant feedback.
- **Order Summary**: Real-time subtotal, free delivery calculation, and total payable amount.
- **Recent Orders Table**: Live status badges (*Pending Approval*, *Delivered*), with details view modal and invoice download.
- **Sidebar Tabs**:
  - 📊 **Dashboard** (Active panoramic overview)
  - 🛒 **Book Order** (Dedicated multi-step ordering flow)
  - 📦 **My Orders** (Live order tracking timeline)
  - 👤 **Profile** (Customer personal info and address manager)
  - 🔔 **Notifications** (Order status alerts and offers)
  - 🎧 **Support** (24/7 Helpline `1800-202-6000`, WhatsApp chat, and ticket submission)
  - 🚪 **Logout**

---

### 3. 👑 Super Admin Facility & Plant Dashboard
Designed for bottling plant managers and facility directors:
- **4 Wave Metric Stat Cards**: *Total Orders (124)*, *Approved Orders (98)*, *Pending Approval (18)*, *Delivered Orders (96)*.
- **Orders Overview Multi-Line Chart**: Interactive SVG spline chart with *This Month*, *Last 3 Months*, and *Last 6 Months* filter tabs.
- **Pending Approvals Queue**: Live queue with instant `✓ Approve` and `✕ Reject` actions, plus bulk batch approval.
- **Sidebar Tabs**:
  - 📊 **Dashboard** (Full overview)
  - 📅 **Orders** (Master order directory with search and status filters)
  - 📝 **Approvals** (Dedicated authorization queue)
  - 👥 **Customers** (Corporate distributors and hotel partners directory)
  - 📦 **Products** (Certified SKUs, TDS, pH levels, and case packs)
  - 🗄️ **Inventory** (Raw reservoir, RO-treated buffer, finished goods stock + batch logger)
  - 📈 **Reports** (Lab quality audits, monthly volume dispatched, revenue analytics)
  - 👤 **Users** (Plant staff, chemists, supervisors, and fleet drivers)
  - ⚙️ **Settings** (Plant license numbers, target TDS configuration)
  - 🚪 **Logout**

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript (`.tsx`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite 6

---

## 💻 Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/PAWANESH-YADAV/Vaadro-watwe-project.git
cd Vaadro-watwe-project

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

Server will run at **http://localhost:3000** (or **http://localhost:3001**).

---

## 📄 License

© 2026 VAADRO®. All rights reserved. Packaged Drinking Water.
