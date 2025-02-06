import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/viewBooks")
      .then(response => {
        console.log("API Response:", response.data); // Debugging
        setBooks(response.data.books || []); // Ensure books is an array
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError("Failed to load books.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📚 Available Books</h2>

        {loading && <p className="text-center text-blue-500">Loading books...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map(book => (
              <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={book.image || "https://via.placeholder.com/150"} 
                  alt={book.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <p className="text-gray-600">By {book.author}</p>
                  <p className="text-gray-500 text-sm">📅 {book.publishedYear}</p>
                  <p className="text-green-600 font-bold mt-2">Available Copies: {book.availableCopies}</p>
                  <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    Borrow Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500 mt-6">No books available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
