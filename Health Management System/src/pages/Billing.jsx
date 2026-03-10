import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard, CheckCircle, FileText, Download, Wallet, ArrowUpRight
} from 'lucide-react';

const Billing = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Invoice List */}
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 mb-6">
                            Billing & Invoices
                        </h1>

                        {/* Active Invoice Card */}
                        <div className="relative group overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-3xl p-8 shadow-2xl transition-all hover:scale-[1.01]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
                                <div>
                                    <p className="text-blue-200 text-sm mb-1 uppercase tracking-wider font-bold">Total Outstanding</p>
                                    <h2 className="text-5xl font-bold mb-4">$350.00</h2>
                                    <div className="flex gap-3">
                                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold border border-yellow-500/30">Due in 3 Days</span>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">Invoice #INV-2023-001</span>
                                    </div>
                                </div>
                                <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                    Pay Now <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Recent Transactions List */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-slate-400" /> Recent History
                            </h3>

                            <div className="space-y-4">
                                {[
                                    { id: "INV-098", date: "Oct 20, 2023", desc: "General Consultation", amount: "$150.00", status: "Paid" },
                                    { id: "INV-092", date: "Sep 15, 2023", desc: "Blood Test Analysis", amount: "$85.00", status: "Paid" },
                                    { id: "INV-085", date: "Aug 10, 2023", desc: "X-Ray Services", amount: "$210.00", status: "Pending" },
                                ].map((inv, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700 cursor-pointer">
                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${inv.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-orange-100 dark:bg-orange-900/20 text-orange-600'
                                                }`}>
                                                {inv.status === 'Paid' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">{inv.desc}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{inv.id} • {inv.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${inv.status === 'Paid' ? 'bg-green-50 dark:bg-green-900/10 text-green-600' : 'bg-orange-50 dark:bg-orange-900/10 text-orange-600'
                                                }`}>
                                                {inv.status}
                                            </span>
                                            <span className="font-bold text-slate-900 dark:text-white text-lg w-20 text-right">{inv.amount}</span>
                                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Payment Methods & Summary */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Payment Method</h3>

                            {/* Saved Card */}
                            <div className="relative group overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white mb-6 shadow-lg transform transition-transform hover:scale-[1.02]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                                <div className="relative z-10 flex justify-between items-start mb-8">
                                    <CreditCard className="w-8 h-8 opacity-80" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 brightness-0 invert opacity-60" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <p className="font-mono text-xl tracking-widest opacity-90">•••• •••• •••• 4242</p>
                                    <div className="flex justify-between text-xs uppercase tracking-wider opacity-70">
                                        <span>Card Holder</span>
                                        <span>Expires</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>Sarah Jenkins</span>
                                        <span>12/25</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                                + Add New Card
                            </button>
                        </div>

                        {/* Insurance Info */}
                        <div className="bg-blue-50 dark:bg-slate-800 rounded-3xl p-8 border border-blue-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Insurance Coverage</h3>
                            </div>
                            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="flex justify-between">
                                    <span>Provider</span>
                                    <span className="font-bold text-slate-900 dark:text-white">BlueCross BlueShield</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Policy No.</span>
                                    <span className="font-bold text-slate-900 dark:text-white">BC-8923-XK</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Coverage</span>
                                    <span className="font-bold text-green-600">Active (80%)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Start of Helper Import
import { ShieldCheck, Clock } from 'lucide-react';

export default Billing;
