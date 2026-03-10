import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/features' }, // Updated Path
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass dark:glass-dark dark:border-white/5">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                            HealthM
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                        >
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {user ? (
                            <Link to={user.role === 'doctor' ? '/doctor/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard'} className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                                <div className="text-right hidden lg:block">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</div>
                                    <div className="text-xs text-slate-500 capitalize">{user.role}</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border-2 border-slate-100 dark:border-slate-700">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user.name?.charAt(0) || "U"
                                    )}
                                </div>
                            </Link>
                        ) : (
                            <Link to="/login" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={toggleTheme} className="text-slate-600 dark:text-slate-300">
                            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-600 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to={user ? (user.role === 'doctor' ? '/doctor/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard') : "/login"}
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold"
                            >
                                {user ? "Dashboard" : "Sign In"}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
