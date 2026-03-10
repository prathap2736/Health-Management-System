import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fix the errors in the form.");
            return;
        }

        // Simulate API call
        toast.loading("Sending message...");
        setTimeout(() => {
            toast.dismiss();
            toast.success("Message sent successfully!");
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            setErrors({});
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] -z-10 opacity-50"></div>

            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Have questions about our services or need to schedule an intricate procedure? We're here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border outline-none transition-all ${errors.name ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border outline-none transition-all ${errors.email ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                >
                                    <option>General Inquiry</option>
                                    <option>Appointment Issue</option>
                                    <option>Feedback</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="How can we help you?"
                                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border outline-none transition-all resize-none ${errors.message ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'}`}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1 font-bold">{errors.message}</p>}
                            </div>

                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                Send Message <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: Phone, title: "Call Us", content: "+1 (555) 123-4567", sub: "Mon-Fri, 9am-6pm" },
                                { icon: Mail, title: "Email", content: "support@meddash.com", sub: "24/7 Response" },
                                { icon: MapPin, title: "Visit Us", content: "123 Medical Plaza", sub: "New York, NY 10001" },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-200 transition-colors group">
                                    <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                                    <p className="font-medium text-slate-700 dark:text-slate-300">{item.content}</p>
                                    <p className="text-sm text-slate-500 mt-1">{item.sub}</p>
                                </div>
                            ))}
                        </div>

                        {/* Socials */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute inset-0 pattern-dots opacity-20"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Follow Our Updates</h3>
                                    <p className="text-blue-100 text-sm">Stay connected with our latest news.</p>
                                </div>
                                <div className="flex gap-4">
                                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                        <a key={i} href="#" className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all hover:scale-110">
                                            <Icon className="w-5 h-5 text-white" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                alt="Map Location"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    View on Google Maps
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
