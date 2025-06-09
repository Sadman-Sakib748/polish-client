import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useAxiosPublic } from '../../../hooks/useAxiosePublic';

const readingStatusOptions = ["Read", "Reading", "Want-to-Read"];
const categories = ["Fiction", "Non-fiction", "Biography", "Science", "Fantasy", "History"];

const CreateBookForm = () => {
  const item = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

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
    try {
      await axiosPublic.put(`/edits/${item._id}`, formData);
      toast.success("Book updated successfully");
      navigate("/create-page"); // redirect to book list or wherever needed
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update book. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Book Title" />
        <input name="author" value={formData.author} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Author" />
        <input name="coverPhoto" value={formData.coverPhoto} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Cover Photo URL" />
        <input name="totalPages" type="number" value={formData.totalPages} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Total Pages" />

        <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="readingStatus" value={formData.readingStatus} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select Reading Status</option>
          {readingStatusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <textarea name="overview" value={formData.overview} onChange={handleChange} required className="w-full p-2 border rounded" rows={4} placeholder="Overview" />

        <input name="rating" type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Rating" />

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
