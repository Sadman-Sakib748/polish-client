import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const statusColors = {
  Read: "bg-green-500",
  Reading: "bg-blue-500",
  "Want-to-Read": "bg-orange-500",
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || book.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen pt-16 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <section className="py-20 text-white bg-gradient-to-br from-teal-500 via-emerald-600 to-green-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="mb-6 text-6xl font-extrabold leading-tight tracking-wide drop-shadow-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-green-200 to-black dark:from-yellow-300 dark:via-green-400 dark:to-white">
              Community Bookshelf
            </span>
          </motion.h1>
          <motion.p
            className="text-2xl font-medium text-white/90 max-w-2xl mx-auto drop-shadow-sm dark:text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Discover and share amazing books curated by passionate readers like you.
          </motion.p>
        </div>
      </section>


      {/* Filters */}
      <motion.section
        className="bg-white dark:bg-gray-800 py-8 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 pl-10 pr-4 text-gray-700 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.6-10.6 7.5 7.5 0 01-10.6 10.6z"
              />
            </svg>
          </div>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-40 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-white py-2 px-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Fantasy">Fantasy</option>
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-40 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-white py-2 px-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Read">Read</option>
            <option value="Reading">Reading</option>
            <option value="Want-to-Read">Want to Read</option>
          </select>
        </div>
      </motion.section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <motion.div
              className="text-center py-12 text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <>
              <motion.h2
                className="mb-6 text-2xl font-bold"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                {filteredBooks.length} Books Found
              </motion.h2>

              {filteredBooks.length > 0 ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentBooks.map((book, index) => (
                      <motion.div
                        key={book._id}
                        className="group cursor-pointer overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-xl transition-shadow"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div className="relative">
                          <img
                            src={book.coverPhoto}
                            alt={book.title}
                            className="h-64 w-full object-cover"
                          />
                          <span className="absolute top-2 right-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                            {book.category}
                          </span>
                          <span
                            className={`absolute top-2 left-2 rounded px-2 py-1 text-xs font-semibold text-white ${statusColors[book.status]}`}
                          >
                            {book.status}
                          </span>
                        </div>

                        <div className="p-4">
                          <h3 className="mb-2 text-lg font-semibold line-clamp-2 dark:text-white">
                            {book.title}
                          </h3>
                          <p className="mb-2 text-gray-600 dark:text-gray-300">by {book.author}</p>
                          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                            Added by {book.user?.name || "Unknown"}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-yellow-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="none"
                                className="h-4 w-4"
                              >
                                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.78 1.4 8.172L12 18.896l-7.334 3.866 1.4-8.172-5.934-5.78 8.2-1.192z" />
                              </svg>
                              <span className="text-sm font-medium">{book.rating}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                                />
                              </svg>
                              <span>{book.upvotes}</span>
                            </div>
                          </div>

                          <Link to={`/MyBooks/${book._id}`}>
                            <button className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="rounded bg-gray-300 dark:bg-gray-700 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="text-gray-600 dark:text-gray-300">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded bg-gray-300 dark:bg-gray-700 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-300 text-lg">
                    No books found matching your criteria.
                  </p>
                  <Link to="/MyBooks/:id">
                    <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                      Add a Book
                    </button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Bookshelf;
