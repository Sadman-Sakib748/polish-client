import { Link } from "react-router";
import { motion } from "framer-motion";
import { Edit, Trash, Star, Eye } from "lucide-react";

const BookCard = ({ book, onDelete, index, userEmail }) => {
  const status = book.status || book.readingStatus || "";

  const getStatusColor = (status) => {
    switch (status) {
      case "Read":
        return "bg-green-500";
      case "Reading":
        return "bg-blue-500";
      case "Want-to-Read":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="group max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black/40 overflow-hidden hover:shadow-2xl dark:hover:shadow-black/70 hover:-translate-y-2 transition-transform duration-300 ease-in-out"
    >
      <div className="relative overflow-hidden">
        <img
          src={book.coverPhoto || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-72 object-cover rounded-t-xl transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white select-none"
          style={{ backgroundColor: getStatusColor(status) }}
        >
          {status}
        </div>
        <div className="absolute top-3 right-3 bg-white bg-opacity-80 dark:bg-gray-700 dark:bg-opacity-80 rounded-full px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200 select-none">
          {book.category}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl">
          <Link to={`/books/${book._id || book.id}`}>
            <button className="flex items-center gap-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded px-3 py-1.5 shadow-lg dark:shadow-indigo-800/50">
              <Eye className="h-4 w-4" /> View
            </button>
          </Link>
          <Link to={`/edit/${book._id || book.id}`}>
            <button className="flex items-center gap-2 text-xs bg-gray-800 hover:bg-gray-900 text-white rounded px-3 py-1.5 shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 dark:shadow-gray-700/50">
              <Edit className="h-4 w-4" /> Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete(book)}
            className="flex items-center gap-2 text-xs bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1.5 shadow-lg dark:shadow-red-700/50"
          >
            <Trash className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3
          className="text-xl font-bold text-gray-900 dark:text-gray-100 truncate"
          title={book.title}
        >
          {book.title}
        </h3>
        <p
          className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate"
          title={book.author}
        >
          By {book.author}
        </p>
        <p
          className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3"
          title={book.overview}
        >
          {book.overview || "No overview available."}
        </p>

        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-yellow-500 font-semibold">
            <Star className="h-5 w-5" />
            <span className="ml-1">{book.rating ?? "N/A"}</span>
          </div>
          {book.totalPages && (
            <p
              className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 select-none"
              title={`${book.totalPages} pages`}
            >
              📖 {book.totalPages}
            </p>
          )}
          {book.likedBy !== undefined && (
            <p
              className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 select-none"
              title={`${book.likedBy} likes`}
            >
              👍 {book.likedBy}
            </p>
          )}
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 mb-2 select-none">
          Added on{" "}
          {book.createdAt
            ? new Date(book.createdAt).toLocaleDateString()
            : "Unknown"}
        </div>

        {(book.userEmail || book.displayName || userEmail) && (
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 truncate">
            {book.displayName && (
              <p>
                By: <span className="font-medium">{book.displayName}</span>
              </p>
            )}
            {book.userEmail && (
              <p>
                Email: <span className="font-mono">{book.userEmail}</span>
              </p>
            )}
            {!book.userEmail && userEmail && (
              <p>
                Email: <span className="font-mono">{userEmail}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;