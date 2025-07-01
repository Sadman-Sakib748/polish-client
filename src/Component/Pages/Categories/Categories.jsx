import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BookOpen, FileText, Star } from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const allCategories = [
  {
    name: "Fiction",
    Icon: BookOpen,
    gradientFrom: "from-pink-400",
    gradientTo: "to-red-400",
    description: "Dive into imaginative stories and narratives.",
  },
  {
    name: "Non-Fiction",
    Icon: FileText,
    gradientFrom: "from-green-400",
    gradientTo: "to-teal-400",
    description: "Learn from real-world facts and insights.",
  },
  {
    name: "Fantasy",
    Icon: Star,
    gradientFrom: "from-purple-400",
    gradientTo: "to-indigo-500",
    description: "Explore magical realms and fantastical worlds.",
  },
  // other categories omitted for brevity
];

const Categories = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter only requested categories
  const categories = allCategories.filter(({ name }) =>
    ["Fantasy", "Non-Fiction", "Fiction"].includes(name)
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Helmet>
          <title>Categories | Loading...</title>
        </Helmet>
        {/* Simple spinner */}
      <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Helmet>
        <title>Categories | Book App</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-4 tracking-wide">
            Book Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore a variety of genres and themes to find your next great read.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {categories.map(
            ({ name, Icon, gradientFrom, gradientTo, description }, index) => (
              <div
                key={index}
                className={`
                  relative cursor-pointer rounded-[2.5rem] p-8 shadow-lg
                  bg-gradient-to-br ${gradientFrom} ${gradientTo} 
                  text-white
                  hover:shadow-2xl hover:scale-[1.05] transition-transform duration-300 ease-in-out
                  ring-1 ring-transparent hover:ring-white/30
                  flex flex-col items-center text-center group
                `}
                aria-label={`Category: ${name}`}
                tabIndex={0}
              >
                <div
                  className={`
                    mb-6 flex items-center justify-center rounded-full p-5
                    bg-white/20 backdrop-blur-sm shadow-lg
                    w-20 h-20
                  `}
                >
                  <Icon
                    className="w-12 h-12 text-indigo-600 dark:text-indigo-300 drop-shadow-md"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-3xl font-extrabold mb-2 tracking-wide drop-shadow-lg">
                  {name}
                </h2>
                <p className="text-sm max-w-[240px] opacity-90 drop-shadow-md">
                  {description}
                </p>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
