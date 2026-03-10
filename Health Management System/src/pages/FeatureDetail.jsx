import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    FileText, Calendar, Shield, Activity, CreditCard, Lock,
    ArrowLeft, CheckCircle, Zap, Globe
} from 'lucide-react';

const featureData = {
    'smart-patient-records': {
        icon: FileText,
        title: "Smart Patient Records",
        subtitle: "Centralized, Secure, and Intelligent Health Data",
        description: "Experience the future of medical record keeping. Our Smart Patient Records system consolidates medical history, lab results, allergies, and treatment plans into a single, easy-to-navigate digital profile. AI-assisted organization ensures that critical information is always highlighted.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "Instant access to complete medical history",
            "AI-powered flagging of potential drug interactions",
            "Secure sharing between specialists",
            "Automated updates from lab results"
        ]
    },
    'ai-appointment-scheduler': {
        icon: Calendar,
        title: "AI Appointment Scheduler",
        subtitle: "Optimize Your Schedule & Eliminate No-Shows",
        description: "Our intelligent scheduling engine uses machine learning to predict appointment durations and optimize your calendar. Automated reminders via SMS and Email significantly reduce no-show rates, while the self-service booking portal empowers patients to manage their own visits.",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "Smart gap filling to maximize utilization",
            "Automated multi-channel reminders",
            "Patient self-service portal 24/7",
            "Time zone synchronization for telehealth"
        ]
    },
    'doctor-dashboard': {
        icon: Activity,
        title: "Doctor Dashboard",
        subtitle: "Your Command Center for Daily Operations",
        description: "A comprehensive dashboard designed specifically for healthcare providers. get a real-time overview of your day, including upcoming appointments, patient triaging, and critical alerts. Customize widgets to focus on what matters most to your specialty.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "Real-time patient flow monitoring",
            "Quick access to recent patient files",
            "Integrated secure messaging",
            "Telehealth session launcher"
        ]
    },
    'digital-prescriptions': {
        icon: Shield,
        title: "Digital Prescriptions",
        subtitle: "Safety, Speed, and Compliance in Every Rx",
        description: "Say goodbye to illegible handwriting and lost scripts. Our e-prescribing module allows you to send prescriptions directly to the patient's pharmacy of choice. Built-in interaction checks and formulary support ensure safety and affordability.",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "Direct pharmacy transmission",
            "Automatic drug interaction checks",
            "Refill management requests",
            "Controlled substance compliance (EPCS)"
        ]
    },
    'integrated-billing': {
        icon: CreditCard,
        title: "Integrated Billing",
        subtitle: "Seamless Revenue Cycle Management",
        description: "Streamline your financial operations with our integrated billing system. From eligibility verification to claim submission and patient invoicing, automate every step of the revenue cycle. Reduce denials and get paid faster.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "Automated insurance eligibility checks",
            "One-click claim generation",
            "Patient payment portal",
            "Financial reporting and analytics"
        ]
    },
    'bank-grade-security': {
        icon: Lock,
        title: "Bank-Grade Security",
        subtitle: "Uncompromising Protection for Patient Data",
        description: "Security is not an afterthought; it's our foundation. We employ AES-256 encryption, multi-factor authentication, and continuous threat monitoring to ensure your data remains safe and compliant with global standards.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        benefits: [
            "HIPAA, GDPR, and HITECH compliant",
            "End-to-end data encryption",
            "Regular 3rd-party security audits",
            "Granular role-based access control"
        ]
    }
};

const FeatureDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const feature = featureData[id];

    if (!feature) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">Feature not found</h2>
                    <Link to="/features" className="text-blue-600 hover:underline">Return to Features</Link>
                </div>
            </div>
        );
    }

    const { icon: Icon } = feature;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-16 pt-8">
                <div className="container mx-auto px-6">
                    <Link to="/features" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Features
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-6">
                                <Icon className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                                {feature.title}
                            </h1>
                            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">
                                {feature.subtitle}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                {feature.description}
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => user ? navigate(user.role === 'doctor' ? '/doctor/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard') : navigate('/register')}
                                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                                >
                                    {user ? "Go to Dashboard" : "Get Started"}
                                </button>
                                <Link to="/contact" className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    View Demo
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Key Benefits</h3>
                        <div className="space-y-6">
                            {feature.benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                                >
                                    <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-slate-200 text-lg mb-1">{benefit}</h4>
                                        <p className="text-slate-500 text-sm">Optimized for efficiency and reliability.</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Why choose this Feature?</h3>
                            <p className="text-indigo-100 mb-8 leading-relaxed">
                                Integrated seamlessly with the rest of our suite, this module leverages data from across the platform to provide context-aware insights that standalone tools simply cannot match.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <Zap className="w-8 h-8 mb-2 text-yellow-300" />
                                    <div className="font-bold text-2xl">3x</div>
                                    <div className="text-xs text-indigo-200 uppercase font-bold">Faster Workflow</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <Globe className="w-8 h-8 mb-2 text-blue-300" />
                                    <div className="font-bold text-2xl">24/7</div>
                                    <div className="text-xs text-indigo-200 uppercase font-bold">Global Access</div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureDetail;
