import { Edit, Trash2, User } from "lucide-react";
import { motion } from "framer-motion";

const ReviewSection = ({ currentUser, bookReviews, setBookReviews, handleDeleteReview }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Reviews ({bookReviews.length})
      </h3>
      <div className="space-y-6">
        {bookReviews.map((review, index) => (
          <motion.div
            key={review._id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
          >
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {review?.user?.avatar ? (
                  <img src={review?.user?.avatar} alt={review?.user?.name} />
                ) : (
                  <User className="w-6 h-6 m-auto mt-2 text-gray-500 dark:text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{review?.user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review?.createdAt || Date.now()).toLocaleString()}
                    </p>
                  </div>
                  {review?.user?.email === currentUser?.email && (
                    <div className="flex gap-2">
                      <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" disabled>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{review.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
