import { useParams } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Cards from "../Cards/Cards";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewSection from "../ReviewSection/ReviewSection";
import axios from "axios";

const MyBooks = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiusePublic = useAxiosPublic();

  const [currentBook, setCurrentBook] = useState(null);
  const [likedBooks, setLikedBooks] = useState(new Set());
  const [bookReviews, setBookReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUser = user || {
    displayName: "Anonymous",
    email: "unknown@example.com",
    photoURL: null,
  };

  // Helper to get email safely
  const getCurrentUserEmail = (user) => user?.email || "unknown@example.com";

  // Key for localStorage for reviews per book id
  const localStorageKey = `reviews_book_${id}`;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch book details
        const bookRes = await axiusePublic.get(`/books/${id}`);
        setCurrentBook(bookRes.data);

        // Fetch reviews for the book from server
        const reviewsRes = await axiusePublic.get(`/reviews/${id}`);
        const serverReviews = reviewsRes.data || [];

        // Fetch locally saved reviews (if any)
        const localReviewsStr = localStorage.getItem(localStorageKey);
        let localReviews = [];
        try {
          localReviews = localReviewsStr ? JSON.parse(localReviewsStr) : [];
        } catch (e) {
          console.error("Invalid local reviews data", e);
          localReviews = [];
        }

        // Merge server reviews + local reviews but avoid duplicates by _id
        // Assume local reviews have _id property, if not we add some temp id
        const allReviewsMap = new Map();

        serverReviews.forEach((r) => {
          if (r._id) allReviewsMap.set(r._id, r);
        });
        localReviews.forEach((r) => {
          if (r._id && !allReviewsMap.has(r._id)) {
            allReviewsMap.set(r._id, r);
          } else if (!r._id) {
            // If no id in local, create a temp id to avoid duplicates
            const tempId = `local-${Math.random().toString(36).substring(2, 9)}`;
            allReviewsMap.set(tempId, { ...r, _id: tempId });
          }
        });

        const mergedReviews = Array.from(allReviewsMap.values()).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setBookReviews(mergedReviews);

        // Load liked books from localStorage
        const storedLikes = JSON.parse(localStorage.getItem("likedBooks") || "[]");
        setLikedBooks(new Set(storedLikes));
      } catch (error) {
        toast.error("Failed to load book or reviews.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiusePublic, localStorageKey]);

  // Sync likedBooks state with localStorage
  useEffect(() => {
    localStorage.setItem("likedBooks", JSON.stringify(Array.from(likedBooks)));
  }, [likedBooks]);

  // Sync reviews to localStorage on every update
  useEffect(() => {
    // Save reviews only locally
    if (id) {
      localStorage.setItem(localStorageKey, JSON.stringify(bookReviews));
    }
  }, [bookReviews, localStorageKey, id]);

  // Toggle like/unlike book
  const handleLike = async (bookId) => {
    try {
      const res = await axiusePublic.patch(`/like/${bookId}`, {
        email: currentUser.email,
      });

      const liked = res.data?.liked;

      setCurrentBook((prev) => ({
        ...prev,
        likedBy: liked
          ? [...(prev?.likedBy || []), currentUser.email]
          : (prev?.likedBy || []).filter((e) => e !== currentUser.email),
      }));

      setLikedBooks((prev) => {
        const newSet = new Set(prev);
        if (liked) newSet.add(bookId);
        else newSet.delete(bookId);
        return newSet;
      });

      toast.success(liked ? "Liked the book!" : "Unliked the book!");
    } catch (error) {
      toast.error("Failed to like the book.");
      console.error(error);
    }
  };

  // Submit a new review
  const handleSubmitReview = async () => {
    if (!newReview.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }

    if (!id) {
      toast.error("Invalid book ID.");
      return;
    }

    try {
      const reviewData = {
        itemId: id,
        user: {
          name: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL || null,
        },
        text: newReview.trim(),
        rating: 5, // You may want to allow user to select rating instead of hardcoding
      };

      // Post to server
      const res = await axios.post(`https://assignment-server-11-dun.vercel.app/reviews`, reviewData);
      const insertedId = res.data?.reviewId;

      if (!insertedId) {
        toast.error("Failed to post review.");
        return;
      }

      const newPostedReview = {
        _id: insertedId,
        ...reviewData,
        createdAt: new Date().toISOString(),
      };

      setBookReviews((prev) => [newPostedReview, ...prev]);
      setNewReview("");
      toast.success("Review posted successfully!");
    } catch (error) {
      console.error("Submit review error:", error);
      toast.error(error.response?.data?.error || "Failed to post review.");
    }
  };

  // Update an existing review
  const handleUpdateReview = async () => {
    if (!newReview.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }

    try {
      const res = await axios.put(
        `https://assignment-server-11-dun.vercel.app/reviews/${editingReviewId}`,
        { text: newReview.trim() }
      );

      if (res.data.modifiedCount) {
        setBookReviews((prev) =>
          prev.map((review) =>
            review._id === editingReviewId ? { ...review, text: newReview.trim() } : review
          )
        );
        toast.success("Review updated successfully!");
        setEditingReviewId(null);
        setNewReview("");
      } else {
        toast.error("No changes made.");
      }
    } catch (error) {
      toast.error("Error updating review.");
      console.error(error);
    }
  };

  // Delete a review by id
  const handleDeleteReview = async (reviewId) => {
    try {
      // Delete from server
      await axiusePublic.delete(`/reviews/${reviewId}`);
      setBookReviews((prev) => prev.filter((review) => review._id !== reviewId));
      toast.success("Review deleted.");

      if (editingReviewId === reviewId) {
        setEditingReviewId(null);
        setNewReview("");
      }
    } catch (error) {
      toast.error("Failed to delete review.");
      console.error(error);
    }
  };

  // Start editing a review (load text in input)
  const startEditingReview = (review) => {
    setEditingReviewId(review._id);
    setNewReview(review.text);
  };

  // Cancel editing review
  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setNewReview("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentBook) {
    return <div className="text-center text-gray-500">Book not found.</div>;
  }

  return (


    // ...

    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-3 pb-10 bg-gray-100 dark:bg-gray-900">
      <div className="grid gap-2 lg:grid-cols-3">
        {/* Left column: Book Card */}
        <Cards
          coverPhoto={currentBook.coverPhoto}
          title={currentBook.title}
          author={currentBook.author}
          category={currentBook.category}
          readingStatus={currentBook.readingStatus}
          rating={currentBook.rating}
          likedByCount={currentBook.likedBy?.length || 0}
          liked={likedBooks.has(currentBook._id)}
          onLikeToggle={() => handleLike(currentBook._id)}
          userName={currentBook.userName}
          userEmail={currentBook.userEmail}
          totalPages={currentBook.totalPages}
          book={currentBook}
          likedBooks={likedBooks}
          handleLike={handleLike}
          currentUserEmail={getCurrentUserEmail(currentUser)}
        />

        {/* Right column with animation */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Book Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {currentBook.title || "Untitled"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              by {currentBook.author || "Unknown"}
            </p>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Overview
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {currentBook.overview || "No overview available."}
            </p>
          </div>

          {/* Review Form */}
          <ReviewForm
            newReview={newReview}
            setNewReview={setNewReview}
            isEditing={!!editingReviewId}
            handleSubmitReview={handleSubmitReview}
            handleUpdateReview={handleUpdateReview}
            handleCancelEdit={handleCancelEdit}
            handleDeleteReview={handleDeleteReview}
          />

          {/* Review List */}
          <ReviewSection
            currentUser={currentUser}
            bookReviews={bookReviews}
            handleDeleteReview={handleDeleteReview}
            startEditingReview={startEditingReview}
          />
        </motion.div>
      </div>
    </div>

  );
};

export default MyBooks;
