import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Heart className="h-6 w-6 text-white fill-current" />
                            </div>
                            <span className="text-2xl font-bold text-white">HealthM</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed max-w-xs">
                            Next-generation healthcare management platform designed for modern clinics and patient convenience.
                        </p>
                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Services', 'Doctors', 'Appointment', 'Contact'].map((link, i) => (
                                <li key={i}>
                                    <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors"></span>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
                        <ul className="space-y-4">
                            {['Cardiology', 'Neurology', 'Pediatrics', 'Eye Care', 'Dental Care', 'Orthopedics'].map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-blue-400 transition-colors"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Address</h4>
                                    <p className="text-sm">123 Health Avenue, Medical District, NY 10001</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Phone</h4>
                                    <p className="text-sm">+1 (555) 123-4567</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-slate-800 rounded-lg text-blue-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Email</h4>
                                    <p className="text-sm">support@healthm.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 HealthM. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
