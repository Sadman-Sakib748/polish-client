import React, { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverPhoto: "",
    totalPages: "",
    category: "",
    readingStatus: "",
    overview: "",
    userEmail: "user@example.com", // Read-only
    userName: "Current User", // Read-only
    upvotes: 0, // Read-only
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book data:", formData);
    alert("Book added (check console)");
    // You can add your actual submit logic here
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      author: "",
      coverPhoto: "",
      totalPages: "",
      category: "",
      readingStatus: "",
      overview: "",
      userEmail: "user@example.com",
      userName: "Current User",
      upvotes: 0,
    });
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold">
            📚
          </div>
          <h1 className="text-3xl font-bold mb-2">Add New Book</h1>
          <p className="text-gray-600">Share a book with the community</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Book Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Author */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block mb-1 font-medium">
                  Book Title *
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="author" className="block mb-1 font-medium">
                  Author *
                </label>
                <input
                  id="author"
                  type="text"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Cover Photo URL */}
            <div>
              <label htmlFor="coverPhoto" className="block mb-1 font-medium">
                Cover Photo URL *
              </label>
              <input
                id="coverPhoto"
                type="url"
                placeholder="Enter cover photo URL"
                value={formData.coverPhoto}
                onChange={(e) => handleInputChange("coverPhoto", e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total Pages & Category */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="totalPages" className="block mb-1 font-medium">
                  Total Pages *
                </label>
                <input
                  id="totalPages"
                  type="number"
                  min="1"
                  placeholder="Enter total pages"
                  value={formData.totalPages}
                  onChange={(e) => handleInputChange("totalPages", e.target.value)}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block mb-1 font-medium">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                </select>
              </div>
            </div>

            {/* Reading Status */}
            <div>
              <label htmlFor="readingStatus" className="block mb-1 font-medium">
                Reading Status *
              </label>
              <select
                id="readingStatus"
                value={formData.readingStatus}
                onChange={(e) => handleInputChange("readingStatus", e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select reading status
                </option>
                <option value="Read">Read</option>
                <option value="Reading">Reading</option>
                <option value="Want-to-Read">Want to Read</option>
              </select>
            </div>

            {/* Overview */}
            <div>
              <label htmlFor="overview" className="block mb-1 font-medium">
                Book Overview *
              </label>
              <textarea
                id="overview"
                rows="4"
                placeholder="Enter book overview/description"
                value={formData.overview}
                onChange={(e) => handleInputChange("overview", e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Readonly fields */}
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="userEmail" className="block mb-1 font-medium">
                  User Email
                </label>
                <input
                  id="userEmail"
                  type="email"
                  value={formData.userEmail}
                  disabled
                  className="w-full rounded border border-gray-200 bg-gray-100 px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="userName" className="block mb-1 font-medium">
                  User Name
                </label>
                <input
                  id="userName"
                  type="text"
                  value={formData.userName}
                  disabled
                  className="w-full rounded border border-gray-200 bg-gray-100 px-3 py-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label htmlFor="upvotes" className="block mb-1 font-medium">
                  Upvotes
                </label>
                <input
                  id="upvotes"
                  type="number"
                  value={formData.upvotes}
                  disabled
                  className="w-full rounded border border-gray-200 bg-gray-100 px-3 py-2 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Book
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded border border-gray-400 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
