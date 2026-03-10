import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Award, ShieldCheck, HeartPulse, UserCheck, Play, Code, Database,
    Globe, Server, Box, Layers, Cpu, Eye, Lightbulb, Shield, CheckCircle, Users
} from "lucide-react";

// Helper for Flip Card
const FlipCard = ({ frontIcon: FrontIcon, backTitle, backDesc, color }) => {
    return (
        <div className="group h-80 w-full [perspective:1000px]">
            <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl rounded-3xl">
                {/* Front */}
                <div className="absolute inset-0 h-full w-full bg-white dark:bg-slate-800 rounded-3xl [backface-visibility:hidden] flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                    <div className={`w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center mb-6 shadow-inner ${color}`}>
                        <FrontIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hover to Reveal</h3>
                </div>
                {/* Back */}
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">{backTitle}</h3>
                    <p className="text-blue-100 leading-relaxed">{backDesc}</p>
                </div>
            </div>
        </div>
    );
};

const ValueItem = ({ icon: Icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:border-blue-200"
    >
        <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 mb-4 animate-bounce-slow">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{desc}</p>
    </motion.div>
);

const TechItem = ({ icon: Icon, name }) => (
    <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-default"
    >
        <Icon className="w-8 h-8 text-slate-600 dark:text-slate-300" />
        <span className="font-bold text-xs uppercase tracking-wider text-slate-500">{name}</span>
    </motion.div>
);

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 overflow-x-hidden transition-colors duration-500">

            {/* Hero Section */}
            <section className="relative px-6 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full mb-6 text-sm font-bold tracking-wide uppercase">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span> Since 1998
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
                        Redefining Digital <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                            Healthcare Management
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Our Health Management System is designed to bridge the gap between patients and healthcare providers using modern web technologies.
                    </p>
                </motion.div>
            </section>

            {/* UI Design Showcase Section */}
            <section className="container mx-auto px-6 mb-32 relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Designed for Humans</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            We believe healthcare software should be intuitive, not frustrating. Our interfaces are crafted with focus on usability, accessibility, and visual clarity.
                        </p>

                        <div className="space-y-4">
                            {[
                                { title: "Clean Dashboard", desc: "No clutter, just insights.", color: "bg-blue-500" },
                                { title: "Dark Mode", desc: "Easy on the eyes during night shifts.", color: "bg-purple-500" },
                                { title: "Mobile First", desc: "Works perfectly on any device.", color: "bg-green-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                                    <div className={`w-12 h-12 rounded-full ${item.color} opacity-20 flex-shrink-0`} />
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                className="rounded-2xl shadow-lg transform translate-y-12"
                                alt="Mobile App UI"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                className="rounded-2xl shadow-lg"
                                alt="Dashboard UI"
                            />
                        </div>
                        {/* Decorative Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision (Flip Cards) */}
            <section className="container mx-auto px-6 mb-32">
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <FlipCard
                        frontIcon={ShieldCheck}
                        backTitle="Our Mission"
                        backDesc="To empower healthcare providers with intelligent tools that enhance operational efficiency and patient care."
                        color="text-blue-600"
                    />
                    <FlipCard
                        frontIcon={HeartPulse}
                        backTitle="Our Vision"
                        backDesc="To become the most trusted digital healthcare management solution globally."
                        color="text-purple-600"
                    />
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-16">Our Core Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <ValueItem icon={Eye} title="Transparency" desc="Open & Honest" />
                        <ValueItem icon={Lightbulb} title="Innovation" desc="Always Improving" />
                        <ValueItem icon={Shield} title="Security" desc="Data First" />
                        <ValueItem icon={Users} title="Accessibility" desc="For Everyone" />
                        <ValueItem icon={CheckCircle} title="Reliability" desc="Always On" />
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-24 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Powered By Modern Tech</h2>
                    <p className="text-slate-500 mb-12">Built with the industry's most robust tools.</p>

                    <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
                        <TechItem icon={Code} name="React" />
                        <TechItem icon={Box} name="Tailwind CSS" />
                        <TechItem icon={Layers} name="Framer Motion" />
                        <TechItem icon={Globe} name="Vite" />
                        <TechItem icon={Database} name="Chart.js" />
                        <TechItem icon={Server} name="Node.js" />
                        <TechItem icon={Cpu} name="Healthcare API" />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
