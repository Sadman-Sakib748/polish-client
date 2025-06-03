import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-blue-600 dark:bg-black py-16 text-center text-white dark:text-gray-100 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-4"
      >
        <h2 className="mb-6 text-4xl font-bold">Ready to Join Our Book Community?</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          Create your free account and start your reading journey today!
        </p>
        <motion.button
          onClick={() => navigate("/register")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 dark:bg-gray-100 dark:text-blue-900 shadow-md dark:shadow-black/30 transition-colors hover:bg-gray-100 dark:hover:bg-gray-300"
        >
          Sign Up Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CallToAction;
