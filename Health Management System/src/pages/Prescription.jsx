import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    FileText, Download, Printer, Share2, Pill, Activity, User
} from 'lucide-react';

const Prescription = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Prescription Viewer</h1>
                        <p className="text-slate-500 dark:text-slate-400">Digital prescription record #PRES-8921</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 relative"
                >
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <Activity className="w-96 h-96" />
                    </div>

                    {/* Header */}
                    <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">HealthManager Clinic</h2>
                                    <p className="text-blue-100 text-sm">Excellence in Healthcare</p>
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="font-bold text-lg">Dr. Sarah Mitchell</p>
                                <p className="text-blue-200 text-sm">Cardiologist • MD, Ph.D.</p>
                                <p className="text-blue-200 text-sm">Lic: #8932-NY</p>
                            </div>
                        </div>
                    </div>

                    {/* Patient Info Bar */}
                    <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 p-6 flex flex-wrap gap-8 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-slate-800 text-blue-600 rounded-lg">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="block text-slate-400 uppercase text-xs font-bold">Patient Name</span>
                                <span className="font-bold text-slate-900 dark:text-white text-lg">Michael Anderson</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-slate-800 text-purple-600 rounded-lg">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="block text-slate-400 uppercase text-xs font-bold">Age / Gender</span>
                                <span className="font-bold text-slate-900 dark:text-white text-lg">34 / Male</span>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-slate-800 text-green-600 rounded-lg">
                                <FileText className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="block text-slate-400 uppercase text-xs font-bold">Date</span>
                                <span className="font-bold text-slate-900 dark:text-white text-lg">Oct 24, 2023</span>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Body */}
                    <div className="p-10 space-y-10">

                        {/* Diagnosis */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4" /> Diagnosis
                            </h3>
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-slate-700 dark:text-red-100 font-medium">
                                Acute Bronchitis with mild fever symptoms.
                            </div>
                        </div>

                        {/* Medications */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Pill className="w-4 h-4" /> Medications
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Amoxicillin 500mg", type: "Tablet", dosage: "1-0-1 (After Food)", duration: "5 Days" },
                                    { name: "Paracetamol 650mg", type: "Tablet", dosage: "1-0-1 (For Fever)", duration: "3 Days" },
                                    { name: "Ascoril LS Syrup", type: "Syrup", dosage: "10ml - 0 - 10ml", duration: "5 Days" },
                                ].map((med, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 transition-colors">
                                        <div className="flex items-center gap-4 mb-2 md:mb-0">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 font-bold flex items-center justify-center text-sm">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{med.name}</h4>
                                                <p className="text-slate-500 text-xs uppercase font-bold">{med.type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right w-full md:w-auto flex justify-between md:block px-14 md:px-0">
                                            <div className="font-bold text-slate-700 dark:text-slate-300">{med.dosage}</div>
                                            <div className="text-slate-500 text-sm">{med.duration}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advice */}
                        <div>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Advice</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-2">
                                <li>Drink plenty of warm water.</li>
                                <li>Avoid cold and oily food for one week.</li>
                                <li>Complete the full course of antibiotics.</li>
                            </ul>
                        </div>

                    </div>

                    {/* Footer / Signature */}
                    <div className="p-10 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end">
                        <div className="text-xs text-slate-400 max-w-xs">
                            <p>This is a computer-generated prescription and does not require a physical signature.</p>
                            <p className="mt-2">Generated on: 24 Oct 2023, 10:45 AM</p>
                        </div>
                        <div className="text-center">
                            <div className="h-16 w-32 mb-2 flex items-end justify-center">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="opacity-60 dark:invert w-full" />
                            </div>
                            <p className="font-bold text-slate-900 dark:text-white border-t border-slate-300 dark:border-slate-600 pt-2 px-8">Dr. Sarah Mitchell</p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default Prescription;
