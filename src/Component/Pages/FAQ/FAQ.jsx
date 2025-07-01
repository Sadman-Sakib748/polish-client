import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What is your shipping policy?",
    answer:
      "We deliver nationwide within 3-5 business days. Express shipping options are also available for faster delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we ship only within the country. International shipping options will be introduced soon.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, PayPal, bank transfers, and popular mobile payment services such as Bkash and Nagad.",
  },
  {
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "Orders can be modified or canceled within 2 hours of placement. Please contact our customer support immediately.",
  },
  {
    question: "What is your return and refund policy?",
    answer:
      "You can return defective or incorrect items within 7 days of delivery for a full refund. Returns under special circumstances are accepted up to 14 days.",
  },
];

const transition = {
  duration: 0.35,
  ease: [0.22, 0.61, 0.36, 1], // cubic-bezier for smooth easeOut
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full max-w-full px-6 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
        Frequently Asked Questions
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {faqData.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.div
              key={index}
              layout
              initial={{ borderColor: "#d1d5db" }}
              animate={{
                borderColor: isActive ? "#3b82f6" : "#d1d5db",
                boxShadow: isActive
                  ? "0 8px 24px rgba(59, 130, 246, 0.3)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                scale: isActive ? 1.02 : 1,
              }}
              transition={transition}
              className={`relative rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 hover:shadow-lg cursor-pointer`}
            >
              <motion.span
                layout
                initial={{ width: 0 }}
                animate={{ width: isActive ? 4 : 0 }}
                transition={transition}
                className="absolute left-0 top-0 bottom-0 rounded-l-lg bg-blue-500"
              />

              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-8 py-5 text-left focus:outline-none"
                aria-expanded={isActive}
                aria-controls={`faq-panel-${index}`}
                id={`faq-header-${index}`}
              >
                <span
                  className={`text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 ${
                    isActive ? "text-blue-700 dark:text-blue-300" : ""
                  }`}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={transition}
                  className="text-blue-600 dark:text-blue-400 text-3xl select-none"
                  aria-hidden="true"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="content"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-header-${index}`}
                    initial={{ height: 0, opacity: 0, y: 10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: 10, transition: { delay: 0.05 } }}
                    transition={transition}
                    className="overflow-hidden px-8 pb-6 text-gray-700 dark:text-gray-300"
                  >
                    <p className="leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
