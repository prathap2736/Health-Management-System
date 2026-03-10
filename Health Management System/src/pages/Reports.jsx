import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Calendar, Activity, TrendingUp, UserPlus, Clock
} from 'lucide-react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement
);

const Reports = () => {
    // Chart Data
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: [12000, 19000, 3000, 5000, 2000, 3000],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            },
        ],
    };

    const patientData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Patients',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
            },
        ],
    };

    const conditionData = {
        labels: ['Fever', 'Dental', 'Checkup', 'Surgery', 'Others'],
        datasets: [
            {
                label: '# of Cases',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar Placeholder (reused logic visually for consistent layout) */}
            <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-6 space-y-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <Activity className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MedDash</span>
                </div>
                <nav className="flex-1 space-y-2">
                    {['Dashboard', 'Reports', 'Finances', 'Staff', 'Settings'].map((item, idx) => (
                        <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${idx === 1 ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'}`}>
                            <div className={`w-2 h-2 rounded-full ${idx === 1 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                            {item}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex-1 overflow-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics & Reports</h1>
                        <p className="text-slate-500 dark:text-slate-400">Deep dive into your clinic's performance</p>
                    </div>
                    {/* Date Filter */}
                    <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Last 30 Days</option>
                        <option>This Month</option>
                        <option>Last Quarter</option>
                    </select>
                </header>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Total Revenue", value: "$124,500", change: "+8%", color: "text-green-500" },
                        { label: "New Patients", value: "356", change: "+12%", color: "text-blue-500" },
                        { label: "Avg. Wait Time", value: "14m", change: "-2m", color: "text-purple-500" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                            </div>
                            <div className={`text-sm font-bold bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full ${stat.color}`}>
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Bar Chart */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Financial Overview</h3>
                        <div className="h-72">
                            <Bar data={revenueData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Patient Line Chart */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Patient Influx</h3>
                        <div className="h-72">
                            <Line data={patientData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Condition Distribution */}
                    <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Treated Conditions</h3>
                        <div className="h-64 flex justify-center">
                            <Doughnut data={conditionData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Top Doctors List */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Top Performing Doctors</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Dr. Sarah Smith", role: "Cardiology", rating: 4.9, patients: 120 },
                                { name: "Dr. John Doe", role: "General", rating: 4.8, patients: 145 },
                                { name: "Dr. Emily Davis", role: "Neurology", rating: 4.7, patients: 98 },
                                { name: "Dr. Michael Chen", role: "Pediatrics", rating: 4.9, patients: 110 },
                            ].map((doc, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold">
                                            {doc.name.charAt(4)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                                            <p className="text-xs text-slate-500 uppercase">{doc.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-yellow-500">★ {doc.rating}</div>
                                        <div className="text-xs text-slate-400">{doc.patients} Patients</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
