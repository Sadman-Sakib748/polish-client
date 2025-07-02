import { HelpCircle, UserPlus, Search, Star } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen px-6 py-12 mt-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Hero Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to your questions and get the support you need to enjoy our platform fully.
          </p>
        </div>

        {/* Help Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <UserPlus className="text-blue-600 dark:text-blue-400" size={28} />
              <h2 className="text-xl font-semibold">Register & Login</h2>
            </div>
            <p>Learn how to create an account, login securely, and manage your credentials.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <Search className="text-green-600 dark:text-green-400" size={28} />
              <h2 className="text-xl font-semibold">Search & Add Books</h2>
            </div>
            <p>Find books by title, author, or category and add them to your personal shelf.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <Star className="text-yellow-500 dark:text-yellow-400" size={28} />
              <h2 className="text-xl font-semibold">Write Reviews</h2>
            </div>
            <p>Share your thoughts on books by submitting reviews and giving ratings.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <HelpCircle className="text-purple-600 dark:text-purple-400" size={28} />
              <h2 className="text-xl font-semibold">More Questions?</h2>
            </div>
            <p>Visit our FAQ or contact support if you need further help or personalized assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
