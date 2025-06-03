import React from 'react';

const Banner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16 px-4 text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                        Welcome to <span className="text-yellow-300">Your Dream Shop</span>
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover amazing products at unbeatable prices.
                    </p>
                    <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-yellow-300 hover:text-black transition duration-300">
                        Explore Now
                    </button>
                </div>

                {/* Image or Illustration */}
                <div className="flex-1">
                    <img
                        src="https://illustrations.popsy.co/white/shopping-bags.svg"
                        alt="Shopping illustration"
                        className="w-full max-w-md mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
