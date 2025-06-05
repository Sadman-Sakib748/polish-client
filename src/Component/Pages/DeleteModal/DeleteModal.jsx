
const DeleteModal = ({ book, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="mb-6">
                    Are you sure you want to delete <strong>{book.title}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="border px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(book._id || book.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;