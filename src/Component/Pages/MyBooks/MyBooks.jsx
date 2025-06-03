
import { useLoaderData } from "react-router";

const MyBooks = () => {
  const book = useLoaderData();
  console.log(book._id)

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 px-4">
      <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        Book Details
      </h2>

      {book ? (
        <div className="max-w-md mx-auto rounded-lg bg-white dark:bg-gray-800 shadow-md overflow-hidden">
          <img
            src={book.cover || "/placeholder.svg?height=300&width=200"}
            alt={book.title}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Author: {book.author || "Unknown"}
            </p>
            <p className="text-sm text-yellow-400 font-semibold mb-2">
              ⭐ {book.rating?.toFixed(1) || "N/A"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Status: <span className="font-medium">{book.status || "N/A"}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Upvotes: {book.upvotes || 0}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Added by: {book.user?.name || "Unknown"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Book not found.
        </p>
      )}
    </div>
  );
};

export default MyBooks;
