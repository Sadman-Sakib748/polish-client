import React from 'react';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-4">
            <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
            <p className="text-2xl mt-4 font-semibold">Page Not Found</p>
            <p className="text-lg mt-2">Sorry, the page you're looking for doesn't exist.</p>

            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            >
                Go Home
            </Link>

            <div className="mt-10 animate-bounce">
                <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.75v14.5M5.75 12h12.5"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Error404;
