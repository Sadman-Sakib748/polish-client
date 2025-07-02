import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useNavigate, useNavigation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import books from '../../assets/books.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, logOut } = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Items', href: '/Bookshelf' },
    { name: 'Categories', href: '/Categories' },
    { name: 'About Us', href: '/AboutUs' },
    { name: 'Contact', href: '/Contact' },
    { name: 'Faq', href: '/faq' },
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
        toast.success('User logged out');
        navigate('/signUp');
      })
      .catch(err => console.error("Logout error:", err.message));
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          <div className="flex items-center gap-2">
            <img className="w-10 h-10" src={books} alt="logo" />
            <h2 className="text-lg font-bold">Books</h2>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center text-gray-700 dark:text-gray-300">
          {navLinks.map(({ name, href }) => (
            <Link key={name} to={href} className="hover:text-blue-500 transition">
              {name}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className="ml-4 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="relative ml-6">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsDropdownOpen(prev => !prev)}
              >
                <img
                  src={user.photoURL || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium">{user.displayName || "User"}</span>
              </div>

              {/* Dropdown - shown on click */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-3 text-sm text-gray-700 dark:text-gray-200">
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                  <hr className="border-t border-gray-200 dark:border-gray-600" />
                  <div className="flex flex-col text-sm">
                    <Link to="/AddBook" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Add Book</Link>
                    <Link to={`/myGroup/${user?.email}`} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Books</Link>
                    <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 dark:text-white"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4 ml-6 text-sm">
              <Link to="/login" className="hover:underline text-blue-600">Login</Link>
              <Link
                to="/signUp"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu toggle button */}
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
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL || 'https://i.pravatar.cc/40'}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link to="/AddBook" className="hover:underline" onClick={() => setIsOpen(false)}>Add Book</Link>
                <Link to={`/myGroup/${user.email}`} className="hover:underline" onClick={() => setIsOpen(false)}>My Books</Link>
                <Link to="/profile" className="hover:underline" onClick={() => setIsOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
              </div>
            ) : (
              <div className="flex space-x-4 mt-4 text-sm">
                <Link to="/login" className="hover:underline text-blue-600" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signUp" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" onClick={() => setIsOpen(false)}>Register</Link>
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
