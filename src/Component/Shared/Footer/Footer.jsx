import {
    Facebook,
    Twitter,
    Instagram,
    Github,
    Linkedin,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Top section */}
                <div className="grid md:grid-cols-3 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">MyBrand</h2>
                        <p className="text-sm">
                            Empowering creativity and innovation through modern web solutions.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Home</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Services</a></li>
                            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-blue-600"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-600"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-blue-600"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-blue-600"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-blue-600"><Github size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-sm">
                    <p>&copy; {new Date().getFullYear()} MyBrand. All rights reserved.</p>
                    <div className="space-x-4 mt-2 md:mt-0">
                        <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
