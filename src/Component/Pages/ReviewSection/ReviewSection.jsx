import { Star, Trash, Edit2 } from "lucide-react";

const ReviewSection = ({
  currentUser,
  bookReviews,
  handleDeleteReview,
  startEditingReview,
}) => {
  const reviewsArray = Array.isArray(bookReviews) ? bookReviews : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Reviews ({reviewsArray.length})
      </h3>

      {reviewsArray.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
      )}

      <ul className="space-y-4 max-h-[400px] overflow-y-auto">
        {reviewsArray.map((review) => (
          <li
            key={review._id}
            className="border-b border-gray-200 dark:border-gray-700 pb-4"
          >
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <img
                  src={review.user?.avatar || "https://via.placeholder.com/40"}
                  alt={review.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {currentUser?.email === review.user?.email && (
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditingReview(review)}
                    title="Edit Review"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    title="Delete Review"
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center mb-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating ? "fill-yellow-400" : "stroke-yellow-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {review.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewSection;
