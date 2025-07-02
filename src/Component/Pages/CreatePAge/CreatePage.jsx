import { useEffect, useState } from "react";
import { useParams, Link } from "react-router"; // react-router-dom for Link and useParams
import useAuth from "../../../hooks/useAuth";
import DeleteModal from "../DeleteModal/DeleteModal";
import Filters from "../Modal/Filters";
import Stats from "../Modal/Stats";
import Header from "../Modal/Header";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CreateBookForm from "../Modal/CreateBookForm";
import useAxiousSecure from "../../../hooks/useAxiousSecure";
import { Edit, Trash, Star, Eye } from "lucide-react";
import toast from "react-hot-toast";

const CreatePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { email: paramEmail } = useParams();
  const userEmail = paramEmail || user?.email;

  const axiosSecure = useAxiousSecure();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [bookToDelete, setBookToDelete] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch user books on load & user change
  useEffect(() => {
    if (authLoading || !userEmail) return;

    setLoading(true);
    setError(null);

    axiosSecure
      .get(`/booking/${userEmail}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch books.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authLoading, userEmail, axiosSecure]);

  // DELETE Book handler
  const handleDeleteBook = async (bookId) => {
    try {
      await axiosSecure.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
      setBookToDelete(null);
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error("Failed to delete the book.");
      console.error(err);
    }
  };

  // CREATE Book handler
  const createBook = async (bookData) => {
    try {
      const res = await axiosSecure.post("/books", bookData);
      setBooks((prev) => [...prev, res.data]);
      setShowCreateForm(false);
      toast.success("Book created successfully");
    } catch (err) {
      toast.error("Failed to create book.");
      console.error(err);
    }
  };

  // On form submit for create
  const handleCreateBook = (bookData) => {
    createBook(bookData);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  // Filter books based on search, category, status
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory;

    const status = book.status || book.readingStatus || "";
    const matchesStatus = selectedStatus === "all" || status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusCount = (status) =>
    books.filter(
      (book) => book.status === status || book.readingStatus === status
    ).length;

  if (authLoading || loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center text-red-600 dark:text-red-400">{error}</p>
    );

  // Inline BookRow component
  const BookRow = ({ book, onDelete, index }) => {
    const status = book.status || book.readingStatus || "";

    const getStatusColor = (status) => {
      switch (status) {
        case "Read":
          return "text-green-600 bg-green-100";
        case "Reading":
          return "text-blue-600 bg-blue-100";
        case "Want-to-Read":
          return "text-orange-600 bg-orange-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    };

    return (
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
          {index + 1}
        </td>

        <td className="px-4 py-2 max-w-xs truncate">
          <div className="flex items-center gap-3">
            <img
              src={book.coverPhoto || "/placeholder.svg"}
              alt={book.title}
              className="w-12 h-16 object-cover rounded"
              loading="lazy"
            />
            <div>
              <Link
                to={`/books/${book._id || book.id}`}
                className="font-semibold text-indigo-600 hover:underline"
                title={book.title}
              >
                {book.title}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                By {book.author}
              </p>
            </div>
          </div>
        </td>

        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
          {book.overview || "No overview available."}
        </td>

        <td className="px-4 py-2 text-sm">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
              status
            )}`}
          >
            {status || "Unknown"}
          </span>
        </td>

        <td className="px-4 py-2 text-sm text-yellow-500 font-semibold flex items-center gap-1">
          <Star className="w-5 h-5" />
          {book.rating ?? "N/A"}
        </td>

        <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          {book.totalPages ? `${book.totalPages} pages` : "-"}
        </td>

        <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          {book.likedBy ?? "-"} 👍
        </td>

        <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
          {(book.userEmail || book.displayName || userEmail) && (
            <>
              {book.displayName && <p>By: {book.displayName}</p>}
              {book.userEmail && <p>Email: {book.userEmail}</p>}
              {!book.userEmail && userEmail && <p>Email: {userEmail}</p>}
            </>
          )}
        </td>

        <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
          <Link
            to={`/books/${book._id || book.id}`}
            className="text-indigo-600 hover:text-indigo-900"
            title="View"
          >
            <Eye className="inline w-5 h-5" />
          </Link>
          <Link
            to={`/edit/${book._id}`}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            title="Edit"
          >
            <Edit className="inline w-5 h-5" />
          </Link>
          <button
            onClick={() => onDelete(book)}
            className="text-red-600 hover:text-red-900"
            title="Delete"
            aria-label={`Delete ${book.title}`}
          >
            <Trash className="inline w-5 h-5" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* Show create form modal */}
      {showCreateForm && (
        <CreateBookForm
          onSubmit={handleCreateBook}
          onCancel={handleCancelCreate}
          displayName={user?.displayName}
          email={userEmail}
        />
      )}

      <Stats
        stats={[
          {
            label: "Total Books",
            count: books.length,
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Books Read",
            count: getStatusCount("Read"),
            color: "text-green-600 dark:text-green-400",
          },
          {
            label: "Currently Reading",
            count: getStatusCount("Reading"),
            color: "text-blue-600 dark:text-blue-400",
          },
          {
            label: "Want to Read",
            count: getStatusCount("Want-to-Read"),
            color: "text-orange-600 dark:text-orange-400",
          },
        ]}
      />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <section className="py-8 container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {filteredBooks.length} Book{filteredBooks.length !== 1 && "s"} Found
          </h2>
        </div>

        {filteredBooks.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Overview
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Pages
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Likes
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Author Info
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBooks.map((book, i) => (
                <BookRow
                  key={book._id}
                  book={book}
                  onDelete={setBookToDelete}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No books found matching the filters.
          </p>
        )}
      </section>

      {bookToDelete && (
        <DeleteModal
          book={bookToDelete}
          onCancel={() => setBookToDelete(null)}
          onConfirm={() => handleDeleteBook(bookToDelete._id)}
        />
      )}
    </div>
  );
};

export default CreatePage;
