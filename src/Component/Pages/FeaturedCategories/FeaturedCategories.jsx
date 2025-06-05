import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";

// Define icons per category (you can extend or customize)
const categoryIcons = {
    Fiction: "📚",
    "Non-Fiction": "🧠",
    Fantasy: "🐉",
    // Add more if needed
};

// Define colors per category
const categoryColors = {
    Fiction: "bg-blue-500",
    "Non-Fiction": "bg-green-500",
    Fantasy: "bg-purple-500",
};

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiousPublic = useAxiosPublic();

useEffect(() => {
  async function fetchBooks() {
    setLoading(true);
    try {
      const res = await axiousPublic.get("/books");
      const books = res.data;

      // Group books by category and count them
      const categoryMap = {};

      books.forEach((book) => {
        const cat = book.category || "Unknown";

        if (!categoryMap[cat]) {
          categoryMap[cat] = {
            name: cat,
            count: 0,
            icon: categoryIcons[cat] || "📖",
            color: categoryColors[cat] || "bg-gray-500",
          };
        }
        categoryMap[cat].count += 1;
      });

      // Convert object to array
      const categoriesArray = Object.values(categoryMap);

      setCategories(categoriesArray);
    } catch (error) {
      console.error(error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }
  fetchBooks();
}, []);


    if (loading) {
        return (
            <section className="bg-gray-50 dark:bg-gray-900 py-16 text-center text-gray-700 dark:text-gray-300">
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                        Featured Categories
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Explore books by your favorite genres
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="group cursor-pointer rounded-lg bg-white dark:bg-gray-800 p-8 text-center shadow-sm transition-all hover:shadow-lg hover:-translate-y-2">
                                <div
                                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${category.color} text-2xl text-white`}
                                >
                                    {category.icon}
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {category.count} books available
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;
