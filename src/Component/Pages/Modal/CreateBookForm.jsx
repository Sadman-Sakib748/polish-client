import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import lottly from '../../../assets/edit.json';
import { Helmet } from 'react-helmet';
import useAxiousSecure from '../../../hooks/useAxiousSecure';

const readingStatusOptions = ["Read", "Reading", "Want-to-Read"];
const categories = ["Fiction", "Non-fiction", "Fantasy"];

const CreateBookForm = () => {
  const item = useLoaderData();
  const navigate = useNavigate();
  const axiousSecure = useAxiousSecure();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: item?.title || '',
    author: item?.author || '',
    coverPhoto: item?.coverPhoto || '',
    totalPages: item?.totalPages || '',
    category: item?.category || '',
    readingStatus: item?.readingStatus || '',
    overview: item?.overview || '',
    rating: item?.rating || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item?._id) {
      toast.error("Missing book ID");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending data:", formData);
      const response = await axiousSecure.patch(`/books/${item._id}`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Book updated successfully");
        navigate("/Bookshelf");
      } else {
        console.warn("Unexpected response:", response);
        toast.error("Unexpected server response");
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto mt-10 bg-white dark:bg-gray-900 p-8 shadow-md dark:shadow-gray-700 transition-colors duration-300">
      <Helmet>
        <title>Books | Edit</title>
      </Helmet>
      <h2 className="text-5xl text-center font-bold mb-8 text-blue-700 dark:text-blue-400">Edit Book</h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center items-start">
          <div className="w-[400px]">
            <Lottie animationData={lottly} loop={true} />
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Book Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter book title"
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Author</label>
              <input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter author name"
              />
            </div>

            {/* Cover Photo */}
            <div>
              <label htmlFor="coverPhoto" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Cover Photo URL</label>
              <input
                id="coverPhoto"
                name="coverPhoto"
                value={formData.coverPhoto}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter cover photo URL"
              />
            </div>

            {/* Total Pages */}
            <div>
              <label htmlFor="totalPages" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Total Pages</label>
              <input
                id="totalPages"
                name="totalPages"
                type="number"
                value={formData.totalPages}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter total number of pages"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Reading Status */}
            <div>
              <label htmlFor="readingStatus" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Reading Status</label>
              <select
                id="readingStatus"
                name="readingStatus"
                value={formData.readingStatus}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Reading Status</option>
                {readingStatusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Overview */}
            <div>
              <label htmlFor="overview" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Overview</label>
              <textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                rows={5}
                placeholder="Write a brief overview of the book"
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">Rating</label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Rate the book (0-5)"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBookForm;