import { Link } from "react-router"; // <-- use "react-router-dom" instead of "react-router"
import {
    Facebook,
    Twitter,
    Instagram,
    Github,
    Linkedin,
} from 'lucide-react';
import books from '../../../assets/books.jpg';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top section */}
                <div className="grid md:grid-cols-4 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">
                    {/* Brand */}
                    <div>
                        <div className='flex items-center'>
                            <img className='w-14' src={books} alt="Books Logo" />
                            <h2 className="ml-3 text-2xl font-bold">Books</h2>
                        </div>
                        <p className="text-sm mt-2">
                            Empowering creativity and innovation through modern web solutions.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
                            <li><Link to="/AboutUs" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
                            <li><Link to="/Categories" className="hover:text-blue-600 dark:hover:text-blue-400">Categories</Link></li>
                            <li><Link to="/Contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link to="/Bookshelf" className="hover:text-blue-600 dark:hover:text-blue-400">Explore Books</Link></li>
                            <li><Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400">My Account</Link></li>
                            <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Help</h3>
                        <ul className="space-y-2">
                            <li><Link to="/helpCenter" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</Link></li>
                            <li><Link to="/support" className="hover:text-blue-600 dark:hover:text-blue-400">Support</Link></li>
                            <li><Link to="/privacyPolicy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm">
                    <p>&copy; {new Date().getFullYear()} Books. All rights reserved.</p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600"><Facebook size={20} /></a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-600"><Twitter size={20} /></a>
                        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500"><Instagram size={20} /></a>
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-500"><Linkedin size={20} /></a>
                        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-800 dark:hover:text-white"><Github size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
