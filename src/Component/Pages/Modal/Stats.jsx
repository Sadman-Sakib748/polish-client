import { motion } from "framer-motion";

const Stats = ({ stats }) => (
  <section className="py-8">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-4">
      {stats.map(({ label, count, color, darkColor }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`
            text-center rounded shadow p-6 
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
          `}
        >
          <div className={`text-3xl font-bold ${color} dark:${darkColor}`}>
            {count}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Stats;
