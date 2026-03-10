import { useState } from 'react';
import {
    HeartPulse, User, Calendar, FileText, CheckCircle, Clock, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
            {/* Header Profile Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 pt-24 pb-32 px-6 rounded-b-[3rem] shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-10"></div>
                <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8 text-white">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl overflow-hidden bg-white">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-4xl font-bold">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                            )}
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-white text-blue-600 rounded-full shadow-lg hover:scale-110 transition-transform">
                            <User className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">Hello, {user?.name || "Guest"}</h1>
                        <p className="text-blue-100 flex items-center justify-center md:justify-start gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Premium Member • ID: #PT-8932
                        </p>
                        <div className="mt-6 flex gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => navigate('/profile')}
                                className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium transition-colors"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={() => navigate('/appointments')}
                                className="px-6 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-full text-sm font-bold shadow-lg transition-colors"
                            >
                                Book New
                            </button>
                        </div>
                    </div>

                    {/* Quick Health Stats */}
                    <div className="ml-auto w-full md:w-auto grid grid-cols-3 gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                        {[
                            { label: "Weight", value: "62kg" },
                            { label: "Height", value: "170cm" },
                            { label: "Blood", value: "A+" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center px-4 border-r border-white/20 last:border-0">
                                <div className="text-xs text-blue-200 uppercase">{stat.label}</div>
                                <div className="font-bold text-lg">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 -mt-20 relative z-20 pb-12">
                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Upcoming Appointments */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                    Upcoming Visits
                                </h2>
                                <button onClick={() => navigate('/appointments')} className="text-blue-600 text-sm font-bold hover:underline">View Calendar</button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { date: "Oct 24", time: "09:00 AM", doctor: "Dr. Emily Chen", type: "Cardiology Checkup", status: "Confirmed" },
                                    { date: "Nov 02", time: "02:30 PM", doctor: "Dr. Mark Wilson", type: "General Consultation", status: "Pending" },
                                ].map((appt, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-center">
                                            <span className="text-xs text-slate-500 uppercase font-bold">{appt.date.split(' ')[0]}</span>
                                            <span className="text-xl font-extrabold text-blue-600">{appt.date.split(' ')[1]}</span>
                                        </div>
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{appt.type}</h3>
                                            <p className="text-slate-500 text-sm">with {appt.doctor} • {appt.time}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {appt.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Medical History */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-purple-500" />
                                    Recent Reports
                                </h2>
                                <button onClick={() => navigate('/reports')} className="text-purple-600 text-sm font-bold hover:underline">See All</button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: "Blood Test Results", date: "Oct 15, 2023", size: "2.4 MB" },
                                    { title: "X-Ray Report", date: "Sep 22, 2023", size: "15 MB" },
                                    { title: "Prescription #892", date: "Aug 10, 2023", size: "1.1 MB" },
                                    { title: "Dental Scan", date: "Jul 05, 2023", size: "8.5 MB" },
                                ].map((file, idx) => (
                                    <div key={idx} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group">
                                        <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">{file.title}</h4>
                                            <p className="text-xs text-slate-400">{file.date} • {file.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar - Vitals & Actions */}
                    <div className="space-y-8">
                        {/* Vitals Card */}
                        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <HeartPulse className="w-5 h-5 text-red-500" /> Vitals
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                                        <span>Heart Rate</span>
                                        <span className="font-bold text-white">72 bpm</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div className="bg-red-500 h-full w-[70%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                                        <span>Blood Pressure</span>
                                        <span className="font-bold text-white">120/80</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div className="bg-green-500 h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2 text-slate-300">
                                        <span>Glucose</span>
                                        <span className="font-bold text-white">95 mg/dL</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-2">
                                        <div className="bg-blue-500 h-full w-[60%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Book Appt", icon: Calendar, color: "bg-blue-50 text-blue-600", path: "/appointments" },
                                    { label: "Prescription", icon: FileText, color: "bg-purple-50 text-purple-600", path: "/prescriptions" },
                                    { label: "Lab Tests", icon: Activity, color: "bg-green-50 text-green-600", path: "/reports" },
                                    { label: "Support", icon: CheckCircle, color: "bg-orange-50 text-orange-600", path: "/contact" },
                                ].map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => navigate(action.path)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-lg transition-all ${action.color} dark:bg-opacity-10 dark:text-opacity-90`}
                                    >
                                        <action.icon className="w-6 h-6 mb-2" />
                                        <span className="text-xs font-bold">{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
