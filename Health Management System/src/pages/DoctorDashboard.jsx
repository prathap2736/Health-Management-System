import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Calendar, Activity, TrendingUp, UserPlus, Clock
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
);

const DoctorDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Chart Data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Patients',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Male', 'Female', 'Child'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar - Simplified for now */}
            <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 space-y-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MedDash</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {['Dashboard', 'Appointments', 'Patients', 'Messages', 'Settings'].map((item, idx) => (
                        <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${idx === 0 ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}`}>
                            <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-1">Upload Report</h4>
                        <p className="text-xs text-blue-100 mb-3">Drag and drop files here</p>
                        <button className="w-full pym-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">Upload</button>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name || "Doctor"}</h1>
                        <p className="text-slate-500 dark:text-slate-400">Here is your daily activity summary</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm relative">
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            <Clock className="w-5 h-5 text-slate-500" />
                        </button>
                        <img
                            src={user?.avatar || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
                            onClick={() => navigate('/profile')}
                        />
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Patients", value: "1,240", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                        { title: "Appointments", value: "86", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                        { title: "Treatments", value: "32", icon: HeartPulse, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                        { title: "Income", value: "$42k", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-green-500 text-xs font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                    +12%
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts & Activity */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Patient Overview</h3>
                        <div className="h-64 w-full">
                            <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} />
                        </div>
                    </div>

                    {/* Demographics */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Demographics</h3>
                        <div className="h-48 w-full flex justify-center">
                            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                        </div>
                        <div className="mt-8 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Male</span>
                                <span className="font-bold text-slate-900 dark:text-white">45%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-blue-500 h-full w-[45%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="mt-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
                        <button className="text-blue-600 font-bold text-sm hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-400 text-xs uppercase border-b border-slate-100 dark:border-slate-700">
                                    <th className="font-semibold py-4 px-4">Patient Name</th>
                                    <th className="font-semibold py-4 px-4">Date</th>
                                    <th className="font-semibold py-4 px-4">Condition</th>
                                    <th className="font-semibold py-4 px-4">Status</th>
                                    <th className="font-semibold py-4 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {[
                                    { name: "John Doe", date: "Oct 24, 2023", cond: "Fever", status: "Active" },
                                    { name: "Sarah Connor", date: "Oct 25, 2023", cond: "Dental", status: "Completed" },
                                    { name: "Michael Smith", date: "Oct 26, 2023", cond: "Checkup", status: "Pending" },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                                        <td className="py-4 px-4 font-bold text-slate-800 dark:text-white flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-white flex items-center justify-center text-xs">
                                                {row.name.charAt(0)}
                                            </div>
                                            {row.name}
                                        </td>
                                        <td className="py-4 px-4 text-slate-500">{row.date}</td>
                                        <td className="py-4 px-4 text-slate-500">{row.cond}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                row.status === 'Completed' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors font-medium">Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
