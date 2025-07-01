import React from "react";
import { Helmet } from "react-helmet";
import { BookOpen, Users, Zap, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Helmet>
        <title>About Us | Book App</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-4 py-16">
        {/* Top Split Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 mb-20">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-6">
              Who We Are
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Book App</span> is your ultimate companion for organizing, discovering, and enjoying books. Built with 💙 using <strong>React</strong> and <strong>Node.js</strong>, this platform is made for every passionate reader.
              <br /><br />
              Whether you're a casual browser or an avid bookworm, we've created a space where stories come alive, shelves are smart, and readers connect.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://i.ibb.co/MknwqD6L/Chat-GPT-Image-Jul-1-2025-02-26-50-PM.png"
              alt="About Illustration"
              className="w-full max-w-md mx-auto rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            To revolutionize how people discover, manage, and engage with books in the digital world — creating not just a virtual bookshelf, but a lifelong reading journey.
          </p>
        </div>

        {/* Unique Features Section */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-12">What Makes Us Unique</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center">
              <BookOpen className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Bookshelf</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Track your reads, wishlist, and history with elegance.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center">
              <Users className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Social Reading</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Join a community of readers, exchange thoughts & reviews.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center">
              <Zap className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Blazing speed, responsive UI, and smooth interactions.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition-all text-center">
              <ShieldCheck className="w-10 h-10 mx-auto text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Privacy-focused, secure data, and full user control.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
