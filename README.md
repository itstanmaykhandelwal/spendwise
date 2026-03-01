# 💸 SpendWise – Smart Expense & Subscription Tracker

SpendWise is a modern SaaS-style financial tracking application built with React.  
It helps users manage expenses, track subscriptions, set monthly budgets, and analyze spending trends with a clean, animated UI.

---

## 🚀 Live Demo

🔗 [Live App Link Here]  
🔗 [GitHub Repo Link Here]

---

## ✨ Features

### 📊 Dashboard
- Animated statistics (Total, Monthly, Average)
- Monthly budget tracker with dynamic progress bar
- Upcoming subscription renewal alerts
- Category breakdown (Pie Chart)
- Expense trend visualization

### 💰 Expense Management
- Add, Edit, Delete expenses
- Search with debounce
- Category filter
- Pagination
- Zod validation with React Hook Form
- Local storage persistence

### 🔁 Subscription Tracking
- Recurring billing logic (monthly/yearly)
- Automatic next billing date calculation
- Upcoming renewals detection (next 7 days)
- Mark as Paid / Cancel subscription
- Auto-update billing cycle logic

### 📈 Analytics
- Top spending category detection
- Monthly comparison metrics
- Derived financial insights
- CSV export support

### 🎨 UI & UX
- Animated stat counters
- Smooth page transitions
- Framer Motion modal animations
- Responsive layout
- Dark / Light theme toggle
- Loading skeletons
- Premium glass UI styling

---

## 🧠 Technical Highlights

- Advanced array transformations (map, filter, reduce, sort)
- Derived state computation
- Recurring billing date logic using Date API
- Memoization for performance optimization
- Zustand global state management
- Persistent state with localStorage
- Code splitting with React.lazy
- SEO optimized metadata
- Clean component architecture

---

## 🛠 Tech Stack

- React (Vite)
- Zustand
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- Recharts
- Lucide Icons

---

## 📂 Project Structure
src/
├── components/
├── layouts/
├── pages/
├── store/
├── hooks/
└── App.jsx


---

## 🧪 Installation

```bash
git clone https://github.com/yourusername/spendwise.git
cd spendwise
npm install
npm run dev

npm run build
