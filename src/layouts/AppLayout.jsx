import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    Repeat,
    BarChart3,
    Menu,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import useExpenseStore from "../store/ExpenseStore";

const AppLayout = ({ children }) => {
    const theme = useExpenseStore((state) => state.theme);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    
    const navLinks = [
        {
            to: "/",
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />,
        },
        {
            to: "/expenses",
            label: "Expenses",
            icon: <Receipt size={18} />,
        },
        {
            to: "/subscriptions",
            label: "Subscriptions",
            icon: <Repeat size={18} />,
        },
        {
            to: "/analytics",
            label: "Analytics",
            icon: <BarChart3 size={18} />,
        },
    ];

    const navItemStyle = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`;

    return (
        <div
            className={`${
                theme === "dark"
                    ? "bg-zinc-950 text-zinc-100"
                    : "bg-gray-100 text-black"
            } min-h-screen flex`}
        >
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-zinc-900 p-6 border-r border-zinc-800">
                <div className="mb-10">
                    <h1 className="text-2xl font-bold tracking-tight">
                        SpendWise
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        Smart Expense Tracking
                    </p>
                </div>

                <nav className="space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={navItemStyle}
                        >
                            {link.icon}
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 left-0 h-full w-64 bg-zinc-900 p-6 z-50 md:hidden border-r border-zinc-800"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-xl font-bold">SpendWise</h1>

                                <button onClick={() => setIsOpen(false)}>
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="space-y-2">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setIsOpen(false)}
                                        className={navItemStyle}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </NavLink>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Topbar */}
                <header className="md:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
                    <h1 className="font-semibold">SpendWise</h1>

                    <button onClick={() => setIsOpen(true)}>
                        <Menu size={20} />
                    </button>
                </header>

                <main className="flex-1 p-6 md:p-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
                
            </div>
        </div>
    );
};

export default AppLayout;
