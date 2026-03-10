import { motion } from 'framer-motion';
import {
    FileText, Calendar, Shield, Activity, CreditCard,
    Users, Smartphone, Database, Lock, Globe, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Features = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const featuresList = [
        {
            slug: 'smart-patient-records',
            icon: FileText,
            title: "Smart Patient Records",
            desc: "Centralized digital health records accessible securely from anywhere. Track medical history, allergies, and past treatments with AI-assisted organization.",
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            slug: 'ai-appointment-scheduler',
            icon: Calendar,
            title: "AI Appointment Scheduler",
            desc: "Intelligent booking system that minimizes gaps and reduces no-shows. Includes automated reminders via SMS and Email.",
            color: "text-purple-600",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            slug: 'doctor-dashboard',
            icon: Activity,
            title: "Doctor Dashboard",
            desc: "Real-time analytics for healthcare providers. Monitor patient influx, treatment outcomes, and daily schedules at a glance.",
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            slug: 'digital-prescriptions',
            icon: Shield,
            title: "Digital Prescriptions",
            desc: "Paperless, secure, and verifiable prescriptions. Pharmacists can instantly verify authenticity, reducing errors and fraud.",
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-900/30",
        },
        {
            slug: 'integrated-billing',
            icon: CreditCard,
            title: "Integrated Billing",
            desc: "Seamless invoicing and insurance claims processing. Supports multiple payment gateways and automated tax calculations.",
            color: "text-yellow-600",
            bg: "bg-yellow-100 dark:bg-yellow-900/30",
        },
        {
            slug: 'bank-grade-security',
            icon: Lock,
            title: "Bank-Grade Security",
            desc: "End-to-end encryption for all data. HIPAA, GDPR, and HITECH compliant storage ensures patient privacy is never compromised.",
            color: "text-indigo-600",
            bg: "bg-indigo-100 dark:bg-indigo-900/30",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">

            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block p-2 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6">
                        Powerful & Scalable
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6">
                        World-Class Features for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Modern Healthcare
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Everything you need to run a successful medical practice, from patient intake to final billing, all in one unified platform.
                    </p>
                </motion.div>
            </section>

            {/* Main Features Grid */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => navigate(`/features/${feature.slug}`)}
                            className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                {feature.desc}
                            </p>

                            <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm group-hover:gap-2 transition-all">
                                Learn More <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* detailed capabilities */}
            <section className="bg-white dark:bg-slate-900 py-24 border-y border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Built for mobile & web</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
                                Our progressive web app (PWA) technology ensures that doctors and patients can access the system from any device—tables, phones, or desktops—without losing functionality.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Responsive design for all screen sizes",
                                    "Offline mode for critical data access",
                                    "Touch-optimized interface for tablets",
                                    "Instant push notifications"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                        <span className="p-1 rounded-full bg-green-500/20 text-green-600">
                                            <Globe className="w-4 h-4" />
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-6 opacity-20 blur-xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Mobile Interface"
                                className="relative rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-6 py-24 text-center">
                <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pattern-grid"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your clinic?</h2>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
                            Join over 500+ healthcare providers who have transformed their operations with our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => user ? navigate(user.role === 'doctor' ? '/doctor/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard') : navigate('/register')}
                                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1"
                            >
                                {user ? "Go to Dashboard" : "Start Free Trial"}
                            </button>
                            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition-all transform hover:-translate-y-1">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Features;
