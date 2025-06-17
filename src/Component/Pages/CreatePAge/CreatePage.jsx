import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import DeleteModal from "../DeleteModal/DeleteModal";
import BookCard from "../Modal/BookCard";
import Filters from "../Modal/Filters";
import Stats from "../Modal/Stats";
import Header from "../Modal/Header";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import CreateBookForm from "../Modal/CreateBookForm";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import useAxiousSecure from "../../../hooks/useAxiousSecure";

const CreatePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { email: paramEmail } = useParams();
  const userEmail = paramEmail || user?.email;

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiousSecure();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [bookToDelete, setBookToDelete] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    if (authLoading || !userEmail) return;

    console.log("Fetching books for email:", userEmail);

    setLoading(true);
    setError(null);

    axiosSecure
      .get(`/booking/${userEmail}`)
      .then((res) => {
        console.log("Fetched books:", res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authLoading, userEmail, axiosSecure]);

  const handleDeleteBook = async (bookId) => {
    console.log("Deleting book with ID:", bookId);
    try {
      await axiosSecure.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((book) => book._id !== bookId));
      setBookToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the book.");
    }
  };

  const createBook = async (bookData) => {
    console.log("Creating book:", bookData);
    try {
      const res = await axiosSecure.post("/books", bookData);
      console.log("Book created:", res.data);
      setBooks((prev) => [...prev, res.data]);
      setShowCreateForm(false);
      setEditBook(null);
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create book.");
    }
  };

  const updateBook = async (bookData) => {
    if (!editBook) return;
    console.log("Updating book ID:", editBook._id, "with data:", bookData);
    try {
      const res = await axiosSecure.put(`/edits/${editBook._id}`, bookData);
      console.log("Book updated:", res.data);
      setBooks((prev) =>
        prev.map((b) => (b._id === editBook._id ? res.data : b))
      );
      setShowCreateForm(false);
      setEditBook(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update book.");
    }
  };

  const handleCreateOrUpdateBook = (bookData) => {
    console.log("Submit book form with data:", bookData);
    if (editBook) updateBook(bookData);
    else createBook(bookData);
  };

  const handleCancel = () => {
    console.log("Cancel create/edit book form");
    setShowCreateForm(false);
    setEditBook(null);
  };

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
      (book) =>
        book.status === status || book.readingStatus === status
    ).length;

  if (authLoading || loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {showCreateForm && (
        <CreateBookForm
          onSubmit={handleCreateOrUpdateBook}
          onCancel={handleCancel}
          displayName={user?.displayName}
          email={userEmail}
          defaultValues={editBook || {}}
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {filteredBooks.length} Book{filteredBooks.length !== 1 && "s"} Found
        </h2>

        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book, i) => (
              <BookCard
                key={book._id}
                userEmail={userEmail}
                book={book}
                onDelete={setBookToDelete}
                onEdit={() => {
                  console.log("Editing book:", book);
                  setEditBook(book);
                  setShowCreateForm(true);
                }}
                index={i}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No books found matching the filters.
          </p>
        )}
      </section>

      {bookToDelete && (
        <DeleteModal
          book={bookToDelete}
          onCancel={() => {
            console.log("Delete canceled");
            setBookToDelete(null);
          }}
          onConfirm={handleDeleteBook}
        />
      )}
    </div>
  );
};

export default CreatePage;
