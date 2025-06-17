const ReviewForm = ({
  newReview,
  setNewReview,
  handleSubmitReview,
  isEditing = false,
  handleCancelEdit,
  handleUpdateReview,
  handleDeleteReview, // ✅ Add this
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {isEditing ? "Edit Review" : "Write a Review"}
      </h3>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write your review here..."
        rows={4}
        className="w-full p-3 border rounded-md resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      <div className="mt-4 flex gap-4 flex-wrap">
        <button
          onClick={isEditing ? handleUpdateReview : handleSubmitReview}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>

        {isEditing && (
          <>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteReview} // ✅ Use delete handler
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
