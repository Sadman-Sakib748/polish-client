import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Star } from "lucide-react";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";

const CommunityStats = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const axiousePublic = useAxiosPublic();

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const res = await axiousePublic.get("/books");
        const data = res.data;
        setBooks(data);

        // Calculate average rating
        const totalRating = data.reduce((acc, book) => acc + (book.rating || 0), 0);
        const avg = data.length > 0 ? totalRating / data.length : 0;
        setAverageRating(avg.toFixed(1));
      } catch (error) {
        console.error(error);
        setBooks([]);
        setAverageRating(0);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Community Stats
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join our growing community of book lovers
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Books Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center">
              <BookOpen className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? "..." : books.length}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Books in Library</p>
          </motion.div>

          {/* Active Readers (static for now) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center">
              <Users className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">1,234</h3>
            <p className="text-gray-600 dark:text-gray-300">Active Readers</p>
          </motion.div>

          {/* Average Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center">
              <Star className="h-12 w-12 text-yellow-400" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {loading ? "..." : `${averageRating}/5`}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Average Rating</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
