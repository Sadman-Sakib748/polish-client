import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { Link, useNavigation } from 'react-router'; // ✅ Correct import
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logOut } = useAuth();
  const navigation = useNavigation(); // ✅ Used correctly

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Bookshelf', href: '/Bookshelf' },
    { name: 'Add Book', href: '/AddBook' },
    { name: 'My Books', href: '/MyBooks' },
    { name: 'Profile', href: '/profile' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const isDark =
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch(err => console.error("Logout error:", err.message));
  };

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">MyBrand</Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 ml-2">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <img src={user.photoURL || 'https://i.pravatar.cc/40'} alt="User" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{user.displayName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline text-sm flex items-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <Link to="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
              <Link to="/register" className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition">
                Register
              </Link>
            </div>
          )}
        </nav>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-gray-300">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <nav className="flex flex-col px-4 pb-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            <button onClick={toggleDarkMode} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-2">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {user ? (
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL || 'https://i.pravatar.cc/40'} alt="User" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{user.displayName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline text-sm flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
                <Link to="/register" className="text-sm text-white bg-blue-600 px-3 py-1 rounded text-center hover:bg-blue-700 transition">
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}

      {/* ✅ Show Loading Spinner if navigating */}
      {navigation.state === 'loading' && (
        <div className="absolute top-full left-0 w-full">
          <LoadingSpinner />
        </div>
      )}
    </header>
  );
};

export default Navbar;
