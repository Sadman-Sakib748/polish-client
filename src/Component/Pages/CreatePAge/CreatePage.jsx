import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import DeleteModal from "../DeleteModal/DeleteModal";
import BookCard from "../Modal/BookCard";
import Filters from "../Modal/Filters";
import Stats from "../Modal/Stats";
import Header from "../Modal/Header";



const CreatePage = () => {
  const { user } = useAuth();
  const userEmail = user?.email;
  const axiosPublic = useAxiosPublic();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    axiosPublic
      .get(`/booking/${userEmail}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books.");
        setLoading(false);
      });
  }, [userEmail, axiosPublic]);

  const handleDeleteBook = async (bookId) => {
    try {
      await axiosPublic.delete(`/books/${bookId}`);
      setBooks((prev) => prev.filter((book) => book._id !== bookId && book.id !== bookId));
      setBookToDelete(null);
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Failed to delete the book. Please try again.");
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const statusValue = book.status || book.readingStatus || "";
    const matchesStatus = selectedStatus === "all" || statusValue === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusCount = (status) =>
    books.filter((book) => (book.status === status || book.readingStatus === status)).length;

  if (loading) return <div className="text-center p-10">Loading books...</div>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <Header />

      <Stats
        stats={[
          { label: "Total Books", count: books.length, color: "text-blue-600" },
          { label: "Books Read", count: getStatusCount("Read"), color: "text-green-600" },
          { label: "Currently Reading", count: getStatusCount("Reading"), color: "text-blue-600" },
          { label: "Want to Read", count: getStatusCount("Want-to-Read"), color: "text-orange-600" },
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

      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            {filteredBooks.length} Book{filteredBooks.length !== 1 && "s"} Found
          </h2>
          {filteredBooks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book, i) => (
                <BookCard key={book._id || book.id} book={book} onDelete={setBookToDelete} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No books found matching the filters.</p>
          )}
        </div>
      </section>

      {bookToDelete && (
        <DeleteModal
          book={bookToDelete}
          onCancel={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
        />
      )}
    </div>
  );
};

export default CreatePage;
