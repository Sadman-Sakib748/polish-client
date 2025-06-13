import { useState, useEffect } from "react";
import { Link } from "react-router"; // ✅ Corrected from "react-router"
import { motion } from "framer-motion";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import useAuth from "../../../hooks/useAuth";
import { Eye } from "lucide-react";
import { Helmet } from "react-helmet";

const statusColors = {
  Read: "bg-green-500",
  Reading: "bg-blue-500",
  "Want-to-Read": "bg-orange-500",
};

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const res = await axiosPublic.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [axiosPublic]);

  const filteredBooks = books.filter((book) => {
    const title = book?.title || "";
    const author = book?.author || "";
    const category = book?.category || "";
    const status = book?.status || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || status === selectedStatus;

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
    <div className="min-h-screen pt-16 px-4 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>Books | REview</title>
      </Helmet>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">📚 Community Bookshelf</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Browse books shared by readers and upvote your favorites!
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 rounded border px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/4 rounded border px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full md:w-1/4 rounded border px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="all">All Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want to Read</option>
        </select>
      </div>

      {/* Book Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentBooks.map((book) => {
                  const isLiked = book.likedBy?.includes(user?.email);
                  const likeCount = book.likedBy?.length || 0;

                  const handleLike = () => {
                    if (user?.email === book.email)
                      return alert("Lojja korena?");
                    axiosPublic
                      .patch(`/like/${book._id}`, { email: user?.email })
                      .then((res) => {
                        const updatedBooks = books.map((b) =>
                          b._id === book._id
                            ? {
                              ...b,
                              likedBy: res.data.liked
                                ? [...(b.likedBy || []), user?.email]
                                : (b.likedBy || []).filter(
                                  (e) => e !== user?.email
                                ),
                            }
                            : b
                        );
                        setBooks(updatedBooks);
                      })
                      .catch((err) => console.error(err));
                  };

                  return (
                    <motion.div
                      key={book._id}
                      className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                      whileHover={{ scale: 1.02 }}
                    >
                      <img
                        src={book.coverPhoto}
                        alt={book.title}
                        className="h-48 w-full object-cover rounded mb-2"
                      />
                      <h2 className="text-lg font-semibold">{book.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {book.author}
                      </p>
                      <p className="text-sm mt-1 line-clamp-3">
                        {book.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={handleLike}
                          className={`text-sm px-2 py-1 rounded ${isLiked
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                            }`}
                        >
                          ❤️ {likeCount}
                        </button>
                        <Link
                          to={`/books/${book._id}`}
                          className="flex items-center gap-2 bg-blue-600 text-white px-1 rounded shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 focus:ring-offset-1 duration-300 transform hover:translate-x-2 hover:shadow-lg dark:shadow-blue-700"
                        >
                          <Eye />
                        </Link>
                      </div>
                      <span
                        className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded ${statusColors[book.status]
                          } text-white`}
                      >
                        {book.status}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <LoadingSpinner />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bookshelf;
