import { Link } from "react-router";
import { Search, Plus } from "lucide-react";

const Filters = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
}) => (
    <section className="bg-white py-6 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full border rounded py-2 px-3 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-40 border rounded px-3 py-2"
                >
                    <option value="all">All Categories</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                </select>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-40 border rounded px-3 py-2"
                >
                    <option value="all">All Status</option>
                    <option value="Read">Read</option>
                    <option value="Reading">Reading</option>
                    <option value="Want-to-Read">Want to Read</option>
                </select>
            </div>

            <Link to="/AddBook">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    <Plus className="h-4 w-4" />
                    Add New Book
                </button>
            </Link>
        </div>
    </section>
);

export default Filters;
