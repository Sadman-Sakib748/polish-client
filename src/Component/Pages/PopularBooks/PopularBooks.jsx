import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router"; // react-router-dom v6+
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const res = await axiosPublic.get("/books");
        const data = res.data;

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
  }, [axiosPublic]);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Popular Books
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the most loved books in our community
          </p>
        </motion.div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {popularBooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex"
              >
                <div className="group cursor-pointer flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 w-full">
                  <div className="relative h-48 md:h-56 lg:h-48 xl:h-56 shrink-0">
                    <img
                      src={book.coverPhoto || "/placeholder.svg"}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-2 right-2 rounded bg-white dark:bg-gray-700 px-2 py-0.5 text-xs font-semibold text-gray-800 dark:text-gray-100 shadow">
                      {book.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                      {book.title}
                    </h3>
                    {/* Short description or author */}
                    <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                      {book.shortDescription
                        ? book.shortDescription
                        : `Author: ${book.author}`}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <Link
                        to={`/books/${book._id}`}
                        className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
                      >
                        See More
                      </Link>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{book.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{book.upvotes}</span>
                        </div>
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
            <button
              className="
                flex items-center gap-2
                bg-blue-700 text-white
                px-4 py-2 rounded shadow-md
                hover:bg-blue-800
                dark:bg-blue-400 dark:text-gray-900
                dark:hover:bg-blue-500
                focus:outline-none focus:ring-2 focus:ring-blue-400
                dark:focus:ring-blue-300 focus:ring-offset-1
                duration-300 transform hover:translate-x-1 hover:shadow-lg
                dark:shadow-blue-600
              "
            >
              View All Books
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularBooks;
