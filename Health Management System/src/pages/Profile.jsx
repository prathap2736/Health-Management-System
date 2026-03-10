import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Briefcase, Clock, Shield,
    Upload, Camera, Check, X, LogOut, Settings
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    // Initial state based on mocked user data or defaults
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '+1 (555) 123-4567',
        address: user?.address || '123 Medical Plaza, New York, NY 10001',
        dob: user?.dob || '1985-04-12',
        gender: user?.gender || 'Male',
        specialization: user?.specialization || 'Cardiology',
        experience: user?.experience || '12 Years',
        qualification: user?.qualification || 'MBBS, MD',
        availability: user?.availability || 'Mon-Fri, 9am - 5pm'
    });

    const [previewImage, setPreviewImage] = useState(user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                // In a real app, upload to server here
                toast.success("Profile picture updated!");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = () => {
        updateUser(formData);
        setIsEditing(false);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6 transition-colors duration-500">
            <div className="max-w-6xl mx-auto pt-20">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile Settings</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your account information and preferences.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

                            <div className="relative z-10 -mt-12 mb-6">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden shadow-lg bg-white">
                                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                                        <Camera className="w-5 h-5" />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{formData.name}</h2>
                            <p className="text-blue-600 dark:text-blue-400 font-medium mb-6 capitalize">{user?.role || 'Patient'}</p>

                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <Mail className="w-5 h-5 text-blue-500" />
                                    <span className="truncate">{formData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <Phone className="w-5 h-5 text-green-500" />
                                    <span>{formData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <MapPin className="w-5 h-5 text-red-500" />
                                    <span className="truncate">{formData.address}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Security Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-8 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800"
                        >
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-purple-500" /> Security
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">Two-Factor Auth</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <button className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300">
                                    Change Password
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Edit Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">General Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            <form className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </form>

                            {/* Professional Info (Conditional) */}
                            {user?.role === 'doctor' && (
                                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Professional Details</h3>
                                    <form className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Specialization</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    name="specialization"
                                                    value={formData.specialization}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Experience</label>
                                            <div className="relative">
                                                <Clock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                                <input
                                                    type="text"
                                                    name="experience"
                                                    value={formData.experience}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
