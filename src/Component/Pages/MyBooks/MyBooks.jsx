import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Star, Heart, MessageCircle, Edit, Trash2, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";

const MyBooks = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [currentBook, setCurrentBook] = useState(null);
  const [votedBooks, setVotedBooks] = useState(new Set());
  const [newReview, setNewReview] = useState("");
  const [bookReviews, setBookReviews] = useState([]);
  const axiousPublic = useAxiosPublic();

  const currentUser = user || {
    displayName: "Anonymous",
    email: "unknown@example.com",
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiousPublic.get(`/books/${id}`);
        setCurrentBook(response.data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votedBooks") || "[]");
    setVotedBooks(new Set(storedVotes));
  }, []);

  useEffect(() => {
    localStorage.setItem("votedBooks", JSON.stringify(Array.from(votedBooks)));
  }, [votedBooks]);


const handleUpvote = async (bookId) => {
  if (votedBooks.has(bookId)) return;

  setVotedBooks((prev) => new Set(prev).add(bookId));
  setCurrentBook((prev) => ({
    ...prev,
    upvotes: (prev?.upvotes || 0) + 1,
  }));

  try {
    const response = await axiousPublic.post(
      `/books/${bookId}/upvote`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const updatedBook = response.data;
    setCurrentBook(updatedBook);
  } catch (error) {
    console.error("Upvote error:", error.message);
    setVotedBooks((prev) => {
      const copy = new Set(prev);
      copy.delete(bookId);
      return copy;
    });
    setCurrentBook((prev) => ({
      ...prev,
      upvotes: (prev?.upvotes || 1) - 1,
    }));
  }
};


  const handleSubmitReview = () => {
    if (!newReview.trim()) return;

    const review = {
      id: Date.now(),
      user: {
        name: currentUser.displayName,
        email: currentUser.email,
        avatar: "/placeholder.svg",
      },
      text: newReview,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setBookReviews([review, ...bookReviews]);
    setNewReview("");
  };

  const handleDeleteReview = (reviewId) => {
    setBookReviews(bookReviews.filter((review) => review.id !== reviewId));
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-100 px-4 py-8">
      {currentBook ? (
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
          {/* Destructuring for clean access */}
          {(() => {
            const {
              title,
              author,
              coverPhoto,
              totalPages,
              category,
              readingStatus,
              overview,
              rating,
              upvotes,
              userEmail,
              userName,
              _id,
            } = currentBook;

            return (
              <>
                {/* Book Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow p-6"
                >
                  <div className="text-center">
                    <img
                      src={coverPhoto || "https://via.placeholder.com/300x400?text=No+Cover"}
                      alt={title || "Book Cover"}
                      className="mx-auto mb-4 rounded-lg shadow"
                    />
                    <div className="mb-4 flex justify-center space-x-2">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                        {category || "No Category"}
                      </span>
                      <span
                        className={`text-white px-2 py-1 rounded text-sm ${
                          readingStatus === "Read"
                            ? "bg-green-500"
                            : readingStatus === "Reading"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {readingStatus || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-yellow-400" />
                        <span>{rating?.toFixed(1) || "N/A"}</span>
                      </div>
                      <button
                        onClick={() => handleUpvote(_id)}
                        disabled={votedBooks.has(_id)}
                        className={`flex items-center gap-1 text-sm px-2 py-1 rounded border ${
                          votedBooks.has(_id)
                            ? "bg-red-100 border-red-300"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            votedBooks.has(_id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        {upvotes || 0}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Added by:</strong> {userName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {userEmail || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Total Pages:</strong> {totalPages || "?"}
                    </p>
                  </div>
                </motion.div>

                {/* Details & Reviews */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2 space-y-6"
                >
                  {/* Details */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-2">{title || "Untitled"}</h2>
                    <p className="text-lg text-gray-600 mb-4">by {author || "Unknown"}</p>
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-gray-700">{overview || "No overview available."}</p>
                  </div>

                  {/* Review Form */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold">Write a Review</h3>
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Share your thoughts..."
                      className="w-full p-3 border border-gray-300 rounded"
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                    <button
                      onClick={handleSubmitReview}
                      disabled={!newReview.trim()}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Submit Review
                    </button>
                  </div>

                  {/* Reviews */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Reviews ({bookReviews.length})</h3>
                    <div className="space-y-6">
                      {bookReviews.map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border-b pb-4 last:border-b-0"
                        >
                          <div className="flex gap-3 items-start">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                              {review.user.avatar ? (
                                <img src={review.user.avatar} alt={review.user.name} />
                              ) : (
                                <User className="w-6 h-6 m-auto mt-2 text-gray-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{review.user.name}</p>
                                  <p className="text-sm text-gray-500">{review.createdAt}</p>
                                </div>
                                {review.user.email === currentUser.email && (
                                  <div className="flex gap-2">
                                    <button className="text-gray-500 hover:text-blue-600">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteReview(review.id)}
                                      className="text-gray-500 hover:text-red-600"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                              <p className="mt-2 text-gray-700">{review.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            );
          })()}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading book...</p>
      )}
    </div>
  );
};

export default MyBooks;
