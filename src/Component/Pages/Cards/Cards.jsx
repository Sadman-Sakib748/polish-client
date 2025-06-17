import React from "react";

const Cards = ({
  coverPhoto,
  title,
  author,
  category,
  readingStatus,
  rating,
  likedByCount,
  liked,
  onLikeToggle,
  userName,
  userEmail,
  totalPages,
  currentUserEmail, // ✅ received here
}) => {
  const isOwnBook = currentUserEmail === userEmail;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <img
        src={coverPhoto}
        alt={title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <span className="font-semibold">Author:</span> {author}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <span className="font-semibold">Category:</span> {category}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <span className="font-semibold">Pages:</span> {totalPages}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <span className="font-semibold">Reading Status:</span> {readingStatus}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-1">
        <span className="font-semibold">Rating:</span> {rating}/5
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <span className="font-semibold">Added By:</span> {userName}
      </p>

      <button
        onClick={onLikeToggle}
        disabled={isOwnBook}
        className={`px-4 py-2 rounded ${
          liked
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
        } ${isOwnBook ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {liked ? "Unlike" : "Like"} ({likedByCount})
      </button>

      {isOwnBook && (
        <p className="mt-2 text-sm text-red-500">
          You cannot like your own book.
        </p>
      )}
    </div>
  );
};

export default Cards;
