import { Link } from "react-router";
import { motion } from "framer-motion";
import { Edit, Trash, Star } from "lucide-react";

const BookCard = ({ book, onDelete, index,userEmail }) => {
    const status = book.status || book.readingStatus || "";

    const getStatusColor = (status) => {
        switch (status) {
            case "Read":
                return "bg-green-500";
            case "Reading":
                return "bg-blue-500";
            case "Want-to-Read":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded shadow hover:-translate-y-1 transition"
        >
            <div className="relative">
                <img
                    src={book.coverPhoto || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                />
                <span className="absolute top-2 right-2 bg-white text-gray-800 text-xs px-2 py-0.5 rounded">
                    {book.category}
                </span>
                <span
                    className={`absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded ${getStatusColor(
                        status
                    )}`}
                >
                    {status}
                </span>
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
                    <Link to={`/books/${book._id || book.id}/edit`}>
                        <button className="flex items-center gap-1 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600">
                            <Edit className="h-3 w-3" /> Edit
                        </button>
                    </Link>
                    <button
                        onClick={() => onDelete(book)}
                        className="flex items-center gap-1 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                    >
                        <Trash className="h-3 w-3" /> Delete
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-sm text-gray-600">By {book.author}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{book.overview}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{book.userEmail}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{book.displayName}</p>
                <p className="text-sm text-gray-700 line-clamp-3">{book.title}</p>
                <div className="mt-2 flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4" />
                    <span>{book.rating ?? "N/A"}</span>
                </div>
                {book.totalPages && (
                    <p className="text-sm text-gray-500 mt-1">📖 {book.totalPages} pages</p>
                )}
                {book.upvotes !== undefined && <p className="text-sm text-gray-500">👍 {book.upvotes}</p>}
                {book.createdAt && (
                    <p className="text-xs text-gray-400 mt-2">
                        Added on {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default BookCard;
