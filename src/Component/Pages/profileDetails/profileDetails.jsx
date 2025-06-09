"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  BookOpen,
  TrendingUp,
  Edit,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useAxiosPublic } from "../../../hooks/useAxiosePublic";

const ProfileDetails = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    axiosPublic
      .get(`/books?email=${user.email}`)
      .then((res) => {
        const validBooks = res.data.map((b) => ({
          ...b,
          rating: b.rating >= 1 && b.rating <= 5 ? b.rating : 0,
        }));
        setBooks(validBooks);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch books");
      })
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  const totalBooks = books.length;
  const booksRead = books.filter((b) => b.readingStatus === "Read").length;
  const booksReading = books.filter((b) => b.readingStatus === "Reading").length;
  const booksWantToRead = books.filter((b) => b.readingStatus === "Want-to-Read").length;
  const totalReviews = books.reduce((sum, b) => sum + (b.reviews?.length || 0), 0);
  const averageRating = totalBooks > 0
    ? (
        books.reduce((sum, b) => sum + (b.rating || 0), 0) / totalBooks
      ).toFixed(1)
    : 0;

  const categoryMap = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryMap).map(([name, value], i) => {
    const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];
    return { name, value, color: colors[i % colors.length] };
  });

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString("default", { month: "short" });
    const booksInMonth = books.filter((b) => new Date(b.createdAt).getMonth() === i).length;
    return { month, books: booksInMonth };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gray-50 dark:bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Profile Info */}
          <div className="mb-8 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <div className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="relative rounded-full h-24 w-24 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                ) : <User className="h-12 w-12" />}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{user?.displayName || "User"}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{user?.email}</p>
                {user?.metadata?.creationTime && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Member since {new Date(user.metadata.creationTime).toLocaleDateString()}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <StatBox value={totalBooks} label="Total Books" color="blue" />
                  <StatBox value={booksRead} label="Books Read" color="green" />
                  <StatBox value={totalReviews} label="Reviews" color="orange" />
                  <StatBox value={averageRating} label="Avg Rating" color="yellow" />
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-8 lg:grid-cols-2">
            <Card title="Reading Status" icon={<BookOpen className="h-5 w-5" />}>
              <div className="space-y-4">
                <StatusRow label="Completed Books" count={booksRead} color="green" />
                <StatusRow label="Currently Reading" count={booksReading} color="blue" />
                <StatusRow label="Want to Read" count={booksWantToRead} color="orange" />
              </div>
            </Card>

            <Card title="Books by Category">
              <div className="h-64">
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">No category data available</div>
                )}
              </div>
              {categoryData.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm">{cat.name} ({cat.value})</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="lg:col-span-2">
              <Card title="Monthly Reading Progress" icon={<TrendingUp className="h-5 w-5" />}>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="books" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatBox = ({ value, label, color }) => {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    orange: "text-orange-600 dark:text-orange-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${colorMap[color]}`}>{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
};

const StatusRow = ({ label, count, color }) => {
  const bgMap = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`rounded px-2 py-1 text-xs font-semibold text-white ${bgMap[color]}`}>{label.split(" ")[0]}</span>
        <span>{label}</span>
      </div>
      <span className="font-semibold">{count}</span>
    </div>
  );
};

const Card = ({ title, children, icon }) => (
  <div className="rounded-lg bg-white dark:bg-gray-800 shadow-md overflow-hidden">
    <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        {icon && icon}
        {title}
      </h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

export default ProfileDetails;
