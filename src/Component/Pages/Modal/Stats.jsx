import { motion } from "framer-motion";

const Stats = ({ stats }) => (
  <section className="py-8">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-4">
      {stats.map(({ label, count, color }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white rounded shadow p-6"
        >
          <div className={`text-3xl font-bold ${color}`}>{count}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Stats;
