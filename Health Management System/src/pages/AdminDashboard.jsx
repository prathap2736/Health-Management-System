import { useState } from 'react';
import {
    Users, Activity, DollarSign, Shield, Settings, Server, Bell, Search, FileText
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
);

const AdminDashboard = () => {
    // Mock Data
    const serverLoadData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
            {
                label: 'System Load (%)',
                data: [20, 35, 65, 80, 55, 40],
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 p-6 space-y-8">
                <div className="flex items-center gap-3 px-2 text-white">
                    <Shield className="w-8 h-8 text-blue-500" />
                    <span className="text-xl font-bold">AdminPanel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {['Overview', 'User Mgmt', 'System Health', 'Audit Logs', 'Settings'].map((item, idx) => (
                        <button key={idx} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${idx === 0 ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30' : 'hover:bg-slate-800 hover:text-white'}`}>
                            {idx === 0 && <Activity className="w-5 h-5" />}
                            {idx === 1 && <Users className="w-5 h-5" />}
                            {idx === 2 && <Server className="w-5 h-5" />}
                            {idx === 3 && <FileText className="w-5 h-5" />}
                            {idx === 4 && <Settings className="w-5 h-5" />}
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="p-4 bg-slate-800 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-white uppercase">System Status</span>
                    </div>
                    <p className="text-xs text-slate-400">All services operational. version 2.4.0</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Overview</h1>
                        <p className="text-slate-500">Real-time platform monitoring</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search system..."
                                className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 relative hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Users", value: "24,592", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-100" },
                        { label: "Active Doctors", value: "1,240", change: "+5%", icon: Activity, color: "text-green-500", bg: "bg-green-100" },
                        { label: "Revenue (YTD)", value: "$2.4M", change: "+18%", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-100" },
                        { label: "Server Uptime", value: "99.99%", change: "Stable", icon: Server, color: "text-orange-500", bg: "bg-orange-100" },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.bg} dark:bg-opacity-20 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change === 'Stable' ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* System Load Chart */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Server Load Metrics</h3>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-xs text-slate-500">CPU Usage</span>
                            </div>
                        </div>
                        <div className="h-80 w-full">
                            <Line data={serverLoadData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Security Log */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" /> Security Log
                        </h3>
                        <div className="space-y-6">
                            {[
                                { msg: "New admin login detected", time: "2 mins ago", type: "info" },
                                { msg: "Failed login attempt (IP: 192.168.1.1)", time: "15 mins ago", type: "alert" },
                                { msg: "Database backup completed", time: "1 hour ago", type: "success" },
                                { msg: "System update scheduled", time: "3 hours ago", type: "info" },
                                { msg: "New user registration spike", time: "5 hours ago", type: "warning" },
                            ].map((log, idx) => (
                                <div key={idx} className="flex gap-4 items-start relative pl-4 border-l-2 border-slate-100 dark:border-slate-700">
                                    <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${log.type === 'alert' ? 'bg-red-500 shadow-red-500/50 shadow-lg' :
                                        log.type === 'success' ? 'bg-green-500' :
                                            log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                        }`}></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{log.msg}</p>
                                        <p className="text-xs text-slate-500 mt-1">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* User Table */}
                <div className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent User Registrations</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-sm">User</th>
                                    <th className="px-6 py-4 font-semibold text-sm">Role</th>
                                    <th className="px-6 py-4 font-semibold text-sm">Status</th>
                                    <th className="px-6 py-4 font-semibold text-sm">Date</th>
                                    <th className="px-6 py-4 font-semibold text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {[
                                    { name: "Dr. Alicia Keys", email: "alicia@med.com", role: "Doctor", status: "Verified" },
                                    { name: "Mark Zuckerberg", email: "mark@fb.com", role: "Patient", status: "Pending" },
                                    { name: "Elon Musk", email: "elon@space.com", role: "Patient", status: "Verified" },
                                ].map((user, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</div>
                                                    <div className="text-xs text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                                        <td className="px-6 py-4 text-blue-600 font-bold text-sm cursor-pointer hover:underline">Edit</td>
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

// Start of Helper Import


export default AdminDashboard;
