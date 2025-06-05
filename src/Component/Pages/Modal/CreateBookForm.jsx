import React, { useState, useEffect } from "react";

const CreateBookForm = ({handleCreateOrUpdateBook, defaultValues = {}, onSubmit, onCancel, displayName, email }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("fiction");
  const [status, setStatus] = useState("Want-to-Read");
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false); // track if form was initialized with defaultValues

  useEffect(() => {
    if (!initialized && defaultValues && Object.keys(defaultValues).length > 0) {
      setTitle(defaultValues.title || "");
      setAuthor(defaultValues.author || "");
      setCategory(defaultValues.category || "fiction");
      setStatus(defaultValues.status || defaultValues.readingStatus || "Want-to-Read");
      setInitialized(true);
    }
    // If you want to reset form when defaultValues become empty, you could add else block here
  }, [defaultValues, initialized]);



  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">
        {defaultValues && defaultValues._id ? "Edit Book" : "Add New Book"}
      </h3>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleCreateOrUpdateBook} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title<span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter book title"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-medium mb-1">
            Author<span className="text-red-600">*</span>
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter author name"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
            <option value="biography">Biography</option>
            <option value="self-help">Self Help</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block font-medium mb-1">
            Reading Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Want-to-Read">Want to Read</option>
            <option value="Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {defaultValues && defaultValues._id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookForm;
