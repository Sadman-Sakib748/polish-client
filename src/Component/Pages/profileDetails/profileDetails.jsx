import React from "react";
import { motion } from "framer-motion";
import { User, BookOpen, TrendingUp, Edit } from "lucide-react";
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

const userData = {
    name: "John Doe",
    email: "john@example.com",
    profilePhoto: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2024",
    totalBooks: 42,
    booksRead: 28,
    booksReading: 8,
    booksWantToRead: 6,
    totalReviews: 15,
    averageRating: 4.2,
};

const categoryData = [
    { name: "Fiction", value: 18, color: "#3B82F6" },
    { name: "Non-Fiction", value: 12, color: "#10B981" },
    { name: "Fantasy", value: 12, color: "#8B5CF6" },
];

const monthlyData = [
    { month: "Jan", books: 4 },
    { month: "Feb", books: 6 },
    { month: "Mar", books: 3 },
    { month: "Apr", books: 8 },
    { month: "May", books: 5 },
    { month: "Jun", books: 2 },
];


const profileDetails = () => {
    return (
        <div className="min-h-screen pt-16 bg-gray-50 text-gray-800 font-sans">
            <div className="max-w-5xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-md mb-8 p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                        <div className="flex items-center gap-6 flex-1 min-w-0">
                            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center">
                                {userData.profilePhoto ? (
                                    <img
                                        src={userData.profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User size={48} className="text-gray-500" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-3xl font-bold truncate">{userData.name}</h1>
                                <p className="text-gray-500">{userData.email}</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Member since {userData.joinDate}
                                </p>

                                <div className="flex flex-wrap gap-6 mt-4">
                                    <div className="text-center min-w-[80px]">
                                        <div className="text-2xl font-bold text-blue-600">{userData.totalBooks}</div>
                                        <div className="text-sm text-gray-600">Total Books</div>
                                    </div>
                                    <div className="text-center min-w-[80px]">
                                        <div className="text-2xl font-bold text-green-600">{userData.booksRead}</div>
                                        <div className="text-sm text-gray-600">Books Read</div>
                                    </div>
                                    <div className="text-center min-w-[80px]">
                                        <div className="text-2xl font-bold text-orange-600">{userData.totalReviews}</div>
                                        <div className="text-sm text-gray-600">Reviews</div>
                                    </div>
                                    <div className="text-center min-w-[80px]">
                                        <div className="text-2xl font-bold text-yellow-600">{userData.averageRating}</div>
                                        <div className="text-sm text-gray-600">Avg Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
                        >
                            <Edit size={16} />
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Reading Status */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-2 font-semibold text-lg mb-4">
                                <BookOpen size={20} />
                                Reading Status
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            Read
                                        </span>
                                        <span>Completed Books</span>
                                    </div>
                                    <span className="font-semibold">{userData.booksRead}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            Reading
                                        </span>
                                        <span>Currently Reading</span>
                                    </div>
                                    <span className="font-semibold">{userData.booksReading}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            Want to Read
                                        </span>
                                        <span>Want to Read</span>
                                    </div>
                                    <span className="font-semibold">{userData.booksWantToRead}</span>
                                </div>
                            </div>
                        </div>

                        {/* Books by Category Chart */}
                        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
                                Books by Category
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-center gap-6 mt-4">
                                {categoryData.map((category) => (
                                    <div key={category.name} className="flex items-center gap-2 text-sm">
                                        <div
                                            className="w-3 h-3 rounded-sm"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span>{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Reading Progress */}
                        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 flex flex-col">
                            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
                                <TrendingUp size={20} />
                                Monthly Reading Progress
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="books" fill="#3B82F6" name="Books Read" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default profileDetails;