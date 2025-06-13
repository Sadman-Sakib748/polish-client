import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Star, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import ReviewSection from "../ReviewSection/ReviewSection";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import useAuth from "../../../hooks/useAuth";

const MyBooks = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [currentBook, setCurrentBook] = useState(null);
  const [votedBooks, setVotedBooks] = useState(new Set());
  const [likedBooks, setLikedBooks] = useState(new Set());
  const [newReview, setNewReview] = useState("");
  const [bookReviews, setBookReviews] = useState([]);
  const axiusePublic = useAxiosPublic();

  const currentUser = user || {
    displayName: "Anonymous",
    email: "unknown@example.com",
  };

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await axiusePublic.get(`/books/${id}`);
        setCurrentBook(response.data);

        if (response.data.likedBy?.includes(currentUser.email)) {
          setLikedBooks((prev) => new Set(prev).add(id));
        }
      } catch (error) {
        toast.error("Failed to load book details.");
      }
    };


    const fetchReviews = async () => {
      try {
        const response = await axiusePublic.get(`/reviews/${id}`);
        setBookReviews(response.data);
      } catch (error) {
        toast.error("Failed to load reviews.");
      }
    };

    fetchBook();
    fetchReviews();
  }, [id, axiusePublic, currentUser.email]);

  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votedBooks") || "[]");
    setVotedBooks(new Set(storedVotes));

    const storedLikes = JSON.parse(localStorage.getItem("likedBooks") || "[]");
    setLikedBooks(new Set(storedLikes));
  }, []);

  useEffect(() => {
    localStorage.setItem("votedBooks", JSON.stringify(Array.from(votedBooks)));
  }, [votedBooks]);

  useEffect(() => {
    localStorage.setItem("likedBooks", JSON.stringify(Array.from(likedBooks)));
  }, [likedBooks]);

  const handleLike = async (bookId) => {
    try {
      const response = await axiusePublic.patch(`/like/${bookId}`, {
        email: currentUser.email,
      });

      const liked = response.data?.liked;

      setCurrentBook((prev) => ({
        ...prev,
        likedBy: liked
          ? [...(prev.likedBy || []), currentUser?.email]
          : (prev.likedBy || []).filter((e) => e !== currentUser?.email),
      }));

      setLikedBooks((prev) => {
        const newSet = new Set(prev);
        liked ? newSet.add(bookId) : newSet.delete(bookId);
        return newSet;
      });

      toast.success(liked ? "Liked the book!" : "Unliked the book!");
    } catch (error) {
      toast.error("Failed to like the book.");
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }

    try {
      const reviewData = {
        user: {
          name: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL || null,
        },
        text: newReview.trim(),
        rating: 5,
      };

      const response = await axiusePublic.post(`/reviews/${id}`, reviewData);

      const insertedId = response.data?.reviewId;

      if (insertedId) {
        const newPostedReview = {
          _id: insertedId,
          ...reviewData,
          createdAt: new Date().toISOString(),
        };

        setBookReviews((prev) => [newPostedReview, ...prev]);
        toast.success("Review posted successfully!");
        setNewReview("");
      } else {
        toast.error("Something went wrong. Review not saved.");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to post review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axiusePublic.delete(`/reviews/${reviewId}`);
      setBookReviews((prev) => prev.filter((review) => review._id !== reviewId));
      toast.success("Review deleted.");
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-100 dark:bg-gray-900 px-4 py-8">

      {currentBook ? (
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3">
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
              likedBy = [],
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                >
                  <div className="text-center">
                    <img
                      src={coverPhoto || "https://via.placeholder.com/300x400?text=No+Cover"}
                      alt={title || "Book Cover"}
                      className="mx-auto mb-4 rounded-lg shadow"
                    />
                    <div className="mb-4 flex justify-center space-x-2">
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                        {category || "No Category"}
                      </span>
                      <span
                        className={`text-white px-2 py-1 rounded text-sm ${readingStatus === "Read"
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
                      {/* Star */}
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-yellow-400" />
                        <span>
                          {typeof rating === 'number' ? rating.toFixed(1) : "N/A"}
                        </span>
                      </div>

                      {/* Like Button */}
                      <button
                        onClick={() => handleLike(_id)}
                        className={`text-sm px-2 py-1 rounded border transition-colors duration-200 ${likedBooks.has(_id)
                          ? "bg-pink-100 border-pink-300 text-pink-600 dark:bg-pink-900 dark:border-pink-600 dark:text-pink-400"
                          : "bg-white border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                          }`}
                      >
                        ❤️ {likedBy.length || 0}
                      </button>
                    </div>


                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Added by:</strong> {userName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Email:</strong> {userEmail || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <strong>Total Pages:</strong> {totalPages || "?"}
                    </p>
                  </div>
                </motion.div>

                {/* Right column: Details & Reviews */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2 space-y-6"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{title || "Untitled"}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">by {author || "Unknown"}</p>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300">{overview || "No overview available."}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Write a Review</h3>
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Share your thoughts..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                    />
                    <button
                      onClick={handleSubmitReview}
                      disabled={!newReview.trim()}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded transition-colors duration-200"
                    >
                      Submit Review
                    </button>
                  </div>

                  <ReviewSection
                    currentUser={currentUser}
                    bookReviews={bookReviews}
                    setBookReviews={setBookReviews}
                    handleDeleteReview={handleDeleteReview}
                  // Pass dark mode styles if your ReviewSection supports it
                  />
                </motion.div>
              </>
            );
          })()}
        </div>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default MyBooks;
