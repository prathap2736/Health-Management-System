import { useState } from 'react';
import { User, Lock, Mail, ArrowRight, ShieldCheck, HeartPulse, Stethoscope, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        role: 'patient'
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login, register } = useAuth(); // Assume register is also exposed
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 chars";

        if (!isLogin) {
            if (!formData.name) newErrors.name = "Full Name is required";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Shake animation logic handled by motion
            return;
        }

        setLoading(true);
        // Simulate API delay
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
                toast.success("Welcome back!");
            } else {
                await register(formData);
                toast.success("Account created successfully!");
            }
            // Determine redirect based on role
            const role = isLogin ? (formData.email.includes("doctor") ? "doctor" : formData.email.includes("admin") ? "admin" : "patient") : formData.role;

            // Simple logic for demo, real implementation uses backend
            if (role === 'doctor') navigate('/doctor/dashboard');
            else if (role === 'admin') navigate('/admin/dashboard');
            else navigate('/patient/dashboard');

        } catch (error) {
            toast.error(error.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 p-12">
                <div className="absolute inset-0 pattern-grid opacity-10 animate-pulse-slow"></div>

                {/* Parallax Blobs */}
                <motion.div
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
                />

                <div className="relative z-10 text-center text-white space-y-8 max-w-lg">
                    <motion.div
                        key={isLogin ? "login-hero" : "register-hero"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/20">
                            {isLogin ? <HeartPulse className="w-12 h-12 text-blue-300 animate-pulse" /> : <Stethoscope className="w-12 h-12 text-blue-300" />}
                        </div>
                        <h1 className="text-5xl font-bold mb-4 tracking-tight">
                            {isLogin ? "Welcome Back" : "Join Our Network"}
                        </h1>
                        <p className="text-xl text-blue-100 font-light leading-relaxed">
                            {isLogin
                                ? "Manage your health journey with the most advanced medical platform."
                                : "Connect with world-class doctors and manage your health records securely."}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 relative">
                {/* Mobile Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 lg:hidden" />

                <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-800"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {isLogin ? 'Access your secure dashboard' : 'Start your healthy journey today'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode='popLayout'>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-5 overflow-hidden"
                                >
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all ${errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                                    </div>

                                    <div className="flex gap-4">
                                        <label className={`flex-1 p-3 border rounded-xl cursor-pointer transition-all ${formData.role === 'patient' ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                            <input type="radio" name="role" value="patient" checked={formData.role === 'patient'} onChange={handleChange} className="hidden" />
                                            <span className="block text-center text-sm font-bold text-slate-700 dark:text-slate-300">Patient</span>
                                        </label>
                                        <label className={`flex-1 p-3 border rounded-xl cursor-pointer transition-all ${formData.role === 'doctor' ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}>
                                            <input type="radio" name="role" value="doctor" checked={formData.role === 'doctor'} onChange={handleChange} className="hidden" />
                                            <span className="block text-center text-sm font-bold text-slate-700 dark:text-slate-300">Doctor</span>
                                        </label>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all ${errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                            />
                            {errors.email && <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1"><AlertCircle className="w-3 h-3" /> {errors.email}</div>}
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            {errors.password && <div className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-1"><AlertCircle className="w-3 h-3" /> {errors.password}</div>}
                        </div>

                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative group overflow-hidden"
                                >
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border rounded-xl outline-none transition-all ${errors.confirmPassword ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {isLogin && (
                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    Remember me
                                </label>
                                <a href="#" className="text-blue-600 font-bold hover:underline">Forgot password?</a>
                            </div>
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrors({});
                                    setFormData({ ...formData, confirmPassword: '' });
                                }}
                                className="text-blue-600 font-bold hover:underline ml-1"
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span>256-bit Secure Encryption</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
