import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; // react-router-dom for routing
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import lottly from '../../../assets/edit.json';
import { Helmet } from 'react-helmet';
import useAxiousSecure from '../../../hooks/useAxiousSecure';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const readingStatusOptions = ['Read', 'Reading', 'Want-to-Read'];
const categories = ['Fiction', 'Non-fiction', 'Fantasy'];

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiousSecure();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverPhoto: '',
    totalPages: '',
    category: '',
    readingStatus: '',
    overview: '',
    rating: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/books/${id}`);
        const book = res.data;
        setFormData({
          title: book.title || '',
          author: book.author || '',
          coverPhoto: book.coverPhoto || '',
          totalPages: book.totalPages || '',
          category: book.category || '',
          readingStatus: book.readingStatus || '',
          overview: book.overview || '',
          rating: book.rating || '',
        });
      } catch (error) {
        toast.error('Failed to load book data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await axiosSecure.patch(`/edit/${id}`, formData);
      if (res.status === 200 || res.status === 201) {
        toast.success('Book updated successfully!');
        navigate('/Bookshelf');
      } else {
        toast.error('Unexpected server response');
      }
    } catch (error) {
      toast.error('Failed to update book');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-8xl mx-auto mt-10 bg-white dark:bg-gray-900 p-8 shadow-md transition-colors duration-300">
      <Helmet>
        <title>Edit Book</title>
      </Helmet>
      <h2 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
        Edit Book
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex justify-center">
          <div className="w-[400px]">
            <Lottie animationData={lottly} loop />
          </div>
        </div>

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Book Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Author
              </label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Cover Photo */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Cover Photo URL
              </label>
              <input
                name="coverPhoto"
                value={formData.coverPhoto}
                onChange={handleChange}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Total Pages */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Total Pages
              </label>
              <input
                name="totalPages"
                type="number"
                value={formData.totalPages}
                onChange={handleChange}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Reading Status */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Reading Status
              </label>
              <select
                name="readingStatus"
                value={formData.readingStatus}
                onChange={handleChange}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Status</option>
                {readingStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Overview */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Overview
              </label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Rating
              </label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4 space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {saving ? 'Updating...' : 'Update Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
