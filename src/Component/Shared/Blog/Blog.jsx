import { BookOpenCheck, Lightbulb, Mic, Users } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen px-6 mt-6 py-12 bg-gradient-to-br from-yellow-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with book reviews, tips, author stories, and inspiring community voices.
          </p>
        </div>

        {/* Blog Topics */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Blog Card 1 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <BookOpenCheck className="text-blue-600 dark:text-blue-400" size={28} />
              <h2 className="text-xl font-semibold">Top 10 Must-Read Books in 2025</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Discover our curated list of the most impactful and highly rated books of the year.
            </p>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="text-yellow-600 dark:text-yellow-400" size={28} />
              <h2 className="text-xl font-semibold">How to Build Your Reading Habit</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Practical strategies and routines to help you read more consistently and with joy.
            </p>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <Mic className="text-purple-600 dark:text-purple-400" size={28} />
              <h2 className="text-xl font-semibold">Author Spotlight: Exclusive Interviews</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Meet the authors behind the stories. Exclusive Q&As on writing, inspiration, and process.
            </p>
          </div>

          {/* Blog Card 4 */}
          <div className="bg-white dark:bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-green-600 dark:text-green-400" size={28} />
              <h2 className="text-xl font-semibold">Community Stories & Testimonials</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Be inspired by real readers. Read how books changed lives and created connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
