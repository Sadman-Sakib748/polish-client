// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { Link, useNavigate, useNavigation } from 'react-router';  // FIXED import
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import books from '../../assets/books.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logOut } = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Bookshelf', href: '/Bookshelf' },
  ...(user ? [
    { name: 'Add Book', href: '/AddBook' },
    { name: 'My Books', href: `/myGroup/${user?.email}` },
    { name: 'Profile', href: '/profile' },
  ] : [])
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
      .then(() => {
        toast.success('User logged out')
        navigate('/signUp')
        console.log("User logged out")
      })
      .catch(err => console.error("Logout error:", err.message));
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
         <div className='flex items-center'>
           <img className='w-14' src={books} alt="" />
          <h2>Books</h2>
         </div>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center text-gray-700 dark:text-gray-300">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              to={href}
              className="hover:text-blue-500 transition"
            >
              {name}
            </Link>
          ))}

          <button onClick={toggleDarkMode} className="ml-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center space-x-3 ml-6">
              <img
                src={user.photoURL || 'https://i.pravatar.cc/40'}
                alt="User"
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm">{user.displayName || 'User'}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 text-sm hover:underline flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-4 ml-6 text-sm">
              <Link to="/login" className="hover:underline text-blue-600">
                Login
              </Link>
              <Link
                to="/signUp"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-2 px-6 py-4 text-gray-700 dark:text-gray-300">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                className="hover:text-blue-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            ))}

            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 mt-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {user ? (
              <div className="flex flex-col mt-4 space-y-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.photoURL || 'photo'}
                    alt="User"
                    className="w-7 h-7 rounded-full"
                  />
                  <span>{user?.displayName || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4 mt-4 text-sm">
                <Link
                  to="/login"
                  className="hover:underline text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Loading spinner */}
      {navigation.state === 'loading' && (
        <div className="w-full">
          <LoadingSpinner />
        </div>
      )}
    </header>
  );
};

export default Navbar;
