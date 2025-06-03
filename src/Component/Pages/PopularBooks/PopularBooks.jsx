import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router"; // use react-router-dom for v6+
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();

        // Sort books by upvotes & rating to get top 6
        const sorted = data
          .sort((a, b) => b.upvotes - a.upvotes || b.rating - a.rating)
          .slice(0, 6);

        setBooks(data);
        setPopularBooks(sorted);
      } catch (error) {
        console.error(error);
        setBooks([]);
        setPopularBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Popular Books</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the most loved books in our community
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            <LoadingSpinner />
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={book.coverPhoto || "/placeholder.svg"}
                      alt={book.title}
                      className="h-64 w-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded bg-white dark:bg-gray-700 px-2 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-100 shadow">
                      {book.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="mb-3 text-gray-600 dark:text-gray-300">by {book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {book.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <TrendingUp className="h-4 w-4" />
                        <span>{book.upvotes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/Bookshelf">
            <button className="inline-block rounded border border-gray-700 dark:border-gray-300 px-6 py-3 text-lg font-semibold text-gray-700 dark:text-gray-100 transition hover:bg-gray-100 dark:hover:bg-gray-700">
              View All Books
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
