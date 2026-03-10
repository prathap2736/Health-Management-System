import { useState } from 'react';
import {
    Calendar, Clock, User, Phone, MapPin, CheckCircle, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Appointment = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Additional form fields for unauthenticated users or extra details
    const [orderDetails, setOrderDetails] = useState({
        doctor: "Dr. Sarah Mitchell (Cardiology)",
        type: "In-Person Consultation",
        notes: ""
    });

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM"
    ];

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) { // Increased range
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                fullDate: date.toDateString(),
                isoDate: date.toISOString().split('T')[0]
            });
        }
        return dates;
    };

    const handleConfirmBooking = () => {
        if (!user) {
            toast.error("Please login to book an appointment");
            navigate('/login');
            return;
        }
        setShowConfirm(true);
        // Here you would typically save the booking to a database via context/API
    };

    const closeConfirmation = () => {
        setShowConfirm(false);
        // Redirect to dashboard after booking
        navigate(user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 mb-4">
                        Book Your Visit
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        Select a date and time that works best for you. Our doctors are available for both in-person and digital consultations.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left: Selection Panel */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">

                        {/* 1. Date Selection */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                                Select Date
                            </h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {generateDates().map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDate(item.fullDate)}
                                        className={`flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center border transition-all ${selectedDate === item.fullDate
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                                            }`}
                                    >
                                        <span className="text-xs uppercase font-bold opacity-80">{item.day}</span>
                                        <span className="text-2xl font-bold mt-1">{item.date}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Time Selection */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
                                Select Time
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {timeSlots.map((time, idx) => (
                                    <button
                                        key={idx}
                                        disabled={!selectedDate}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 rounded-xl border font-medium text-sm transition-all ${!selectedDate ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800' :
                                            selectedTime === time
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Doctor & Type Selection */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select Doctor</label>
                                <select
                                    value={orderDetails.doctor}
                                    onChange={(e) => setOrderDetails({ ...orderDetails, doctor: e.target.value })}
                                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                >
                                    <option>Dr. Sarah Mitchell (Cardiology)</option>
                                    <option>Dr. Emily Chen (Dermatology)</option>
                                    <option>Dr. James Wilson (General)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Visit Type</label>
                                <select
                                    value={orderDetails.type}
                                    onChange={(e) => setOrderDetails({ ...orderDetails, type: e.target.value })}
                                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                >
                                    <option>In-Person Consultation</option>
                                    <option>Video Call</option>
                                    <option>Follow-up</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 sticky top-28">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Booking Summary</h3>

                            {user ? (
                                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 text-sm text-orange-600 dark:text-orange-400">
                                    Please login to complete your booking.
                                </div>
                            )}

                            <div className="space-y-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-emerald-900/20 text-blue-600 rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold">Date</div>
                                        <div className="font-bold text-slate-900 dark:text-white">{selectedDate || 'Select Date'}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-emerald-900/20 text-blue-600 rounded-lg">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold">Time</div>
                                        <div className="font-bold text-slate-900 dark:text-white">{selectedTime || 'Select Time'}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-emerald-900/20 text-blue-600 rounded-lg">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-bold">Location</div>
                                        <div className="font-bold text-slate-900 dark:text-white">City Hospital, Building A</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmBooking}
                                disabled={!selectedDate || !selectedTime}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${!selectedDate || !selectedTime
                                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:-translate-y-1'
                                    }`}
                            >
                                {user ? 'Confirm Booking' : 'Login to Book'}
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={closeConfirmation}
                        ></motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full relative z-10 text-center shadow-2xl"
                        >
                            <button
                                onClick={closeConfirmation}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Booking Confirmed!</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8">
                                Your appointment has been scheduled successfully. You will be redirected to your dashboard.
                            </p>

                            <button
                                onClick={closeConfirmation}
                                className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                Go to Dashboard
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Appointment;
