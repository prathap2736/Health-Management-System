import { useRef, useState, useEffect } from 'react';
import {
    motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence
} from 'framer-motion';
import {
    Activity, ArrowRight, ShieldCheck, HeartPulse, Clock, FileText,
    Users, Calendar, CheckCircle, Quote, TrendingUp, Database, Lock,
    Smartphone, Cloud, Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- Components ---

const CountUp = ({ to, suffix = "", prefix = "" }) => {
    const ref = useRef();
    // Use a spring for smoother counting
    const springValue = useSpring(0, { damping: 20, stiffness: 100 });
    const isInView = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView.current) {
                    isInView.current = true;
                    springValue.set(to);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [to, springValue]);

    return (
        <motion.span ref={ref} className="tabular-nums">
            {useTransform(springValue, (latest) =>
                `${prefix}${Math.floor(latest)}${suffix}`
            )}
        </motion.span>
    );
};

const TiltCard = ({ children, className, onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;
        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = (mouseX / width - 32.5 / 2) * 1;
        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
                transform
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, color, onClick }) => {
    return (
        <TiltCard
            className="relative group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${color}`}
            >
                <Icon className="w-7 h-7" />
            </div>
            <h3 style={{ transform: "translateZ(30px)" }} className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
            <p style={{ transform: "translateZ(20px)" }} className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Click Hint */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                <ArrowRight className="w-5 h-5" />
            </div>
        </TiltCard>
    );
};

const TestimonialSlider = () => {
    const testimonials = [
        { name: "Dr. Sarah Mitchell", role: "Cardiologist", text: "The most intuitive system I've used in 15 years. It eliminated our paper trail." },
        { name: "James Wilson", role: "Hospital Admin", text: "Patient throughput increased by 40% within the first month of implementation." },
        { name: "Emily Chen", role: "Patient", text: "Booking appointments is finally hassle-free. The mobile app is a lifesaver!" },
        { name: "Michael Chang", role: "Neurologist", text: "The AI diagnostics interaction is groundbreaking. A true partner in practice." },
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <div className="relative h-64 w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/20 dark:border-slate-800 shadow-2xl"
                >
                    <div className="flex gap-1 mb-6">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-yellow-500 fill-current" />)}
                    </div>
                    <Quote className="w-10 h-10 text-blue-200 dark:text-slate-700 mb-4 opacity-50" />
                    <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-medium italic mb-6">"{testimonials[index].text}"</p>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">{testimonials[index].name}</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">{testimonials[index].role}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const WorkflowTimeline = () => {
    const steps = [
        { title: "Register", desc: "Create secure profile" },
        { title: "Book", desc: "Select doctor & time" },
        { title: "Consult", desc: "Digital or in-person" },
        { title: "Prescribe", desc: "Instant medication access" },
        { title: "Billing", desc: "Automated payments" },
    ];

    return (
        <div className="relative py-12">
            {/* Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 hidden md:block">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="flex flex-col items-center text-center bg-white dark:bg-slate-900 md:bg-transparent md:dark:bg-transparent p-6 md:p-0 rounded-2xl shadow-lg md:shadow-none"
                    >
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-4 border-blue-500 flex items-center justify-center font-bold text-blue-600 text-lg shadow-lg mb-4 z-10 transition-transform hover:scale-125 hover:border-indigo-400">
                            {idx + 1}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{step.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// --- Main Page ---

const Home = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const navigate = useNavigate();

    const handleFeatureClick = (feature) => {
        // In a real app, this might navigate to specific feature details pages
        // For now, we'll route to related main pages
        if (feature.title.includes("Scheduling") || feature.title.includes("Book")) {
            navigate('/appointments');
        } else if (feature.title.includes("Billing")) {
            navigate('/billing');
        } else if (feature.title.includes("Rx")) {
            navigate('/prescriptions');
        } else {
            navigate('/features');
        }
    };

    return (
        <div className="home-page overflow-x-hidden dark:bg-slate-950 transition-colors duration-500">

            {/* --- 1. Hero Section (Parallax + Animated) --- */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black">

                {/* Parallax Blobs */}
                <motion.div style={{ y: y1, x: -50 }} className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-[100px] pointer-events-none" />
                <motion.div style={{ y: y2, x: 50 }} className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />

                {/* Floating Medical Icons */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[Activity, HeartPulse, FileText, CheckCircle].map((Icon, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                y: [0, -30, 0],
                                x: [0, i % 2 === 0 ? 20 : -20, 0]
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                delay: i * 2
                            }}
                            className="absolute text-blue-500/20 dark:text-white/10"
                            style={{
                                top: `${20 + i * 20}%`,
                                left: `${10 + i * 20}%`,
                                fontSize: '2rem'
                            }}
                        >
                            <Icon size={40 + i * 10} />
                        </motion.div>
                    ))}
                </div>

                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-300 font-bold text-xs uppercase tracking-widest mb-8 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Live System v2.4
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1]">
                            Intelligent <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-400 animate-gradient-x">
                                Healthcare
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                            A smart digital ecosystem that connects patients, doctors, and administrators seamlessly with automation, security, and real-time analytics.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/register" className="relative group px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/40 transition-all hover:scale-105 hover:shadow-blue-500/60">
                                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left" />
                                <span className="relative flex items-center gap-2">
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </span>
                            </Link>
                            <Link to="/appointments" className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                                <Calendar className="w-5 h-5" /> Book Appointment
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, ease: "backOut" }}
                        className="hidden lg:block relative perspective-1000"
                    >
                        {/* Dashboard Mockup - Glassmorphism */}
                        <div className="relative z-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700 rounded-[2rem] p-4 shadow-2xl transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                alt="Dashboard"
                                className="rounded-3xl shadow-inner shadow-black/20"
                            />

                            {/* Floating Widgets */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="absolute -right-10 top-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 font-bold">98%</div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900 dark:text-white">Patient Satisfaction</div>
                                    <div className="text-green-500 text-xs">+2.4% this week</div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                                className="absolute -left-10 bottom-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-xs"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-500 uppercase">Live Vitals</span>
                                </div>
                                <div className="h-2 w-32 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-2/3 animate-pulse" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. Trust Badge Section (Scroll Animation) --- */}
            <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 dark:divide-slate-800">
                        {[
                            { count: 10000, suffix: "+", label: "Active Patients" },
                            { count: 500, suffix: "+", label: "Certified Doctors" },
                            { count: 50, suffix: "+", label: "Hospitals Connected" },
                            { count: 99.9, suffix: "%", label: "Data Security" },
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <div className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-cyan-500 mb-2">
                                    <CountUp to={stat.count} suffix={stat.suffix} />
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 3. Advanced Features (3D Hover) --- */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block p-2 px-4 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 font-bold text-xs uppercase tracking-widest mb-4"
                        >
                            Powerful Features
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                        >
                            The Ultimate Medical Suite
                        </motion.h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to manage your practice efficiently, securely, and intelligently. Click any feature to explore.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Calendar, title: "AI Scheduling", desc: "Smart booking system that minimizes gaps.", color: "text-blue-500" },
                            { icon: Activity, title: "Patient Monitoring", desc: "Real-time vitals tracking and alerts.", color: "text-red-500" },
                            { icon: Database, title: "Smart Records", desc: "Centralized and searchable history.", color: "text-green-500" },
                            { icon: Cloud, title: "Secure Cloud", desc: "Encrypted storage accessible anywhere.", color: "text-purple-500" },
                            { icon: FileText, title: "Auto Billing", desc: "Seamless invoicing and insurance claims.", color: "text-yellow-500" },
                            { icon: FileText, title: "Rx Management", desc: "Digital prescriptions with pharmacy link.", color: "text-indigo-500" },
                            { icon: Lock, title: "Access Control", desc: "Role-based security for staff.", color: "text-cyan-500" },
                            { icon: TrendingUp, title: "Health Analytics", desc: "Deep insights into clinic performance.", color: "text-orange-500" },
                        ].map((feature, idx) => (
                            <FeatureCard
                                key={idx}
                                {...feature}
                                onClick={() => handleFeatureClick(feature)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 4. How It Works (Timeline) --- */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Seamless Workflow</h2>
                    </div>
                    <WorkflowTimeline />
                </div>
            </section>

            {/* --- 5. System Overview (Scroll Zoom) --- */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20" />
                <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Centralized Intelligence</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Our platform centralizes all healthcare operations into one intelligent system. From patient registration to digital prescriptions and billing, every workflow is optimized for speed, accuracy, and security.
                        </p>
                        <ul className="space-y-4">
                            {["Unified Patient View", "Integrated Pharmacy", "Lab Results Integration", "Telehealth Ready"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckCircle className="text-green-400 w-6 h-6" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-3xl opacity-30 rounded-full" />
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            alt="System Overview"
                            className="relative rounded-2xl shadow-2xl border border-white/10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- 6. Testimonials (Auto Slider) --- */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Trusted by Healthcare Leaders</h2>
                    <TestimonialSlider />
                </div>
            </section>

            {/* --- 7. Call To Action --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="container mx-auto px-6 relative z-10 text-center text-white">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-8"
                    >
                        Ready to Transform Your <br /> Healthcare Management?
                    </motion.h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-10 py-5 bg-white text-blue-900 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg"
                        >
                            Start Free Trial
                        </button>
                        <Link to="/contact" className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg">
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
