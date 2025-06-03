import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const AddBook = () => {
  const { user } = useAuth();

  const initialFormData = {
    title: "",
    author: "",
    coverPhoto: "",
    totalPages: "",
    category: "",
    readingStatus: "",
    overview: "",
    rating: 0,
    userEmail: user?.email || "",
    userName: user?.displayName || "",
    upvotes: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userEmail: user?.email || "",
      userName: user?.displayName || "",
    }));
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStarClick = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        totalPages: Number(formData.totalPages),
        upvotes: Number(formData.upvotes),
        rating: Number(formData.rating),
      };

      await axios.post("http://localhost:3000/books", payload);
      toast.success("📚 Book added successfully!");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("❌ Failed to add book. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 rounded-xl shadow-lg p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-gray-100">
        Add New Book
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title & Author */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Book Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            <label htmlFor="author" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Author
            </label>
            <input
              id="author"
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Cover Photo & Total Pages */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 flex flex-col">
            <label htmlFor="coverPhoto" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Cover Photo URL
            </label>
            <input
              id="coverPhoto"
              type="url"
              placeholder="Cover Photo URL"
              value={formData.coverPhoto}
              onChange={(e) => handleInputChange("coverPhoto", e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            <label htmlFor="totalPages" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Total Pages
            </label>
            <input
              id="totalPages"
              type="number"
              placeholder="Total Pages"
              value={formData.totalPages}
              onChange={(e) => handleInputChange("totalPages", e.target.value)}
              min="1"
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category & Reading Status */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 flex flex-col">
            <label htmlFor="category" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            <label htmlFor="readingStatus" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Reading Status
            </label>
            <select
              id="readingStatus"
              value={formData.readingStatus}
              onChange={(e) => handleInputChange("readingStatus", e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select Reading Status</option>
              <option value="Read">Read</option>
              <option value="Reading">Reading</option>
              <option value="Want-to-Read">Want to Read</option>
            </select>
          </div>
        </div>

        {/* Overview */}
        <div className="flex flex-col">
          <label htmlFor="overview" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
            Book Overview
          </label>
          <textarea
            id="overview"
            placeholder="Book Overview"
            value={formData.overview}
            onChange={(e) => handleInputChange("overview", e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Star Rating */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
            Rating
          </label>
          <div className="flex space-x-2 text-yellow-500 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="focus:outline-none"
              >
                {formData.rating >= star ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* Read-only user info */}
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="flex-1 flex flex-col">
            <label htmlFor="userEmail" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Your Email
            </label>
            <input
              id="userEmail"
              type="email"
              value={formData.userEmail}
              disabled
              className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 transition-colors"
            />
          </div>
          <div className="flex-1 flex flex-col mt-4 md:mt-0">
            <label htmlFor="userName" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={formData.userName}
              disabled
              className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Upvotes */}
        <div className="flex flex-col">
          <label htmlFor="upvotes" className="mb-1 font-medium text-gray-700 dark:text-gray-300">
            Upvotes
          </label>
          <input
            id="upvotes"
            type="number"
            value={formData.upvotes}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 transition-colors"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Book
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
