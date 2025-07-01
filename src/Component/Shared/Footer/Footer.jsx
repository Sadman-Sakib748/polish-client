import { Link } from "react-router";  // <-- import Link here
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
                <div className="grid md:grid-cols-3 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">
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
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/AboutUs" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/Categories" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/Contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://twitter.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://instagram.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="https://github.com/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm">
                    <p>&copy; {new Date().getFullYear()} Books. All rights reserved.</p>
                    <div className="space-x-4 mt-2 md:mt-0">
                        <Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-blue-600">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
