import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Header = () => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 text-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="mb-4 text-5xl font-bold">My Books</h1>
        <p className="text-xl">Manage your personal book collection</p>
      </motion.div>
    </div>
  </section>
);

export default Header;
