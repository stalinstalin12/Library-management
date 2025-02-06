import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        isbn: "",
        publishedYear: "",
        availableCopies: 1,
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Handling Image Upload in Base64
    const onDrop = (acceptedFiles) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFormData((prevData) => ({
                ...prevData,
                image: reader.result, // Storing as Base64
            }));
        };
        reader.readAsDataURL(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
    
        const token = localStorage.getItem("token"); // Ensure token exists
        if (!token) {
            setMessage("User is not authenticated. Please log in.");
            setLoading(false);
            return;
        }
    
        console.log("📤 Sending Data:", formData); // Debug log
    
        try {
            const response = await axios.post(
                "http://localhost:4000/addBook",
                formData,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Ensure auth token is sent
                    },
                }
            );
    
            console.log("✅ Response:", response.data); // Log API response
    
            if (response.status === 201) {
                setMessage("Book added successfully!");
                setFormData({
                    title: "",
                    author: "",
                    isbn: "",
                    publishedYear: "",
                    availableCopies: 1,
                    image: "",
                });
            } else {
                setMessage(response.data.message || "Failed to add book.");
            }
        } catch (error) {
            console.error("❌ Error:", error.response ? error.response.data : error);
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a New Book</h2>
            {message && (
                <div
                    className={`mb-4 p-2 rounded ${
                        message.includes("successfully")
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Published Year</label>
                    <input
                        type="number"
                        name="publishedYear"
                        value={formData.publishedYear}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Available Copies</label>
                    <input
                        type="number"
                        name="availableCopies"
                        value={formData.availableCopies}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Image Upload Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Book Cover Image</label>
                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed p-6 text-center cursor-pointer"
                    >
                        <input {...getInputProps()} />
                        <p>Drag & drop or click to upload an image</p>
                    </div>
                    {formData.image && (
                        <img
                            src={formData.image}
                            alt="Book Cover"
                            className="mt-4 w-32 h-32 object-cover"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    {loading ? "Submitting..." : "Add Book"}
                </button>
            </form>
        </div>
    );
};

export default AddBook;
