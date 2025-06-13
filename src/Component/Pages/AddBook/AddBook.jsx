import React, { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animition from '../../../assets/Lottie.json';
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const AddBook = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const generateInitialData = () => ({
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
  });

  const [formData, setFormData] = useState(generateInitialData());
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const payload = {
        ...formData,
        totalPages: Number(formData.totalPages),
        rating: Number(formData.rating),
        upvotes: 0,
      };

      await axiosPublic.post("/books", payload);
      toast.success("📚 Book added successfully!");
      setFormData(generateInitialData()); // reset form
      navigate('/Bookshelf')
    } catch (error) {
      toast.error("❌ Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(generateInitialData());
  };

  return (
    <div className="max-w-8xl mx-auto mt-12 shadow-xl p-10 bg-gradient-to-tr from-emerald-100 via-teal-100 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Helmet>
        <title>Books | Create</title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Left Side: Lottie Animation + Heading */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 mb-10 md:mb-0">
          <div className="flex justify-center mb-6">
            <Player
              autoplay
              loop
              src={animition}
              style={{ height: '330px', width: '350px' }}
            />
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={handleSubmit} className="space-y-8 md:w-2/3">
          <h1 className="text-4xl font-extrabold text-center md:text-left text-gray-900 dark:text-gray-100 tracking-tight">
            Add New Book
          </h1>
          {/* Title & Author */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="title" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Book Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
                placeholder="Book Title"
              />
            </div>
            <div className="flex-1 flex flex-col mt-6 md:mt-0">
              <label htmlFor="author" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Author
              </label>
              <input
                id="author"
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                required
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
                placeholder="Author"
              />
            </div>
          </div>

          {/* Cover Photo & Total Pages */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="coverPhoto" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Cover Photo URL
              </label>
              <input
                id="coverPhoto"
                type="url"
                value={formData.coverPhoto}
                onChange={(e) => handleInputChange("coverPhoto", e.target.value)}
                required
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
                placeholder="https://example.com/cover.jpg"
              />
            </div>
            <div className="flex-1 flex flex-col mt-6 md:mt-0">
              <label htmlFor="totalPages" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Total Pages
              </label>
              <input
                id="totalPages"
                type="number"
                value={formData.totalPages}
                onChange={(e) => handleInputChange("totalPages", e.target.value)}
                required
                min={1}
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
                placeholder="e.g. 250"
              />
            </div>
          </div>

          {/* Category & Reading Status */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex-1 flex flex-col">
              <label htmlFor="category" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                required
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
              >
                <option value="">Select</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col mt-6 md:mt-0">
              <label htmlFor="readingStatus" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
                Reading Status
              </label>
              <select
                id="readingStatus"
                value={formData.readingStatus}
                onChange={(e) => handleInputChange("readingStatus", e.target.value)}
                required
                className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition"
              >
                <option value="">Select</option>
                <option value="Read">Read</option>
                <option value="Reading">Reading</option>
                <option value="Want-to-Read">Want to Read</option>
              </select>
            </div>
          </div>

          {/* Overview */}
          <div>
            <label htmlFor="overview" className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Book Overview
            </label>
            <textarea
              id="overview"
              rows={5}
              value={formData.overview}
              onChange={(e) => handleInputChange("overview", e.target.value)}
              required
              className="resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:border-emerald-500 transition w-full"
              placeholder="Write a short summary..."
            />
          </div>

          {/* Star Rating */}
          <div>
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-300">Rating</label>
            <div className="flex space-x-3 text-yellow-400 text-3xl select-none">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none hover:scale-110 transition-transform"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  {formData.rating >= star ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          {/* User Info & Upvotes */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <input
              type="email"
              value={formData.userEmail}
              disabled
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed px-4 py-3"
              aria-label="User email"
            />
            <input
              type="text"
              value={formData.userName}
              disabled
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed px-4 py-3 mt-6 md:mt-0"
              aria-label="User name"
            />
          </div>
          <input
            type="number"
            value={formData.upvotes}
            disabled
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed px-4 py-3 mt-6"
            aria-label="Upvotes"
          />

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 bg-blue-600 text-white px-24 py-2 rounded shadow-md
            hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 focus:outline-none focus:ring-2
            focus:ring-blue-400 dark:focus:ring-blue-300 focus:ring-offset-1 duration-300
            transform hover:translate-x-2 hover:shadow-lg dark:shadow-blue-700 ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-emerald-700 hover:scale-105"
                }`}
            >
              Add Book
              {loading && (
                <span
                  className="loading-spinner ml-2 border-t-2 border-b-2 border-white rounded-full w-5 h-5"
                  aria-hidden="true"
                />
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded shadow-md
            hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 focus:outline-none focus:ring-2
            focus:ring-red-400 dark:focus:ring-red-300 focus:ring-offset-1 duration-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default AddBook;
