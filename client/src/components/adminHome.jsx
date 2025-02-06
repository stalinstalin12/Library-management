import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "./addBook";
import ViewUsers from "./viewUsers";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    // Fetch total users
    axios.get("http://localhost:4000/viewUsers")
      .then(response => setTotalUsers(response.data.data.length))
      .catch(error => console.error("Error fetching users:", error));

    // Fetch total books
    axios.get("http://localhost:4000/viewBooks")
      .then(response => setTotalBooks(response.data.totalBooks))
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 bg-blue-900 text-white p-5 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link to="/adminHome" className="hover:text-gray-300">📊 Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/add-book" className="hover:text-gray-300">📚 Add Book</Link>
          </li>
          <li className="mb-4">
            <Link to="/view-users" className="hover:text-gray-300">👥 View Users</Link>
          </li>
          <li className="mt-6">
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 w-full">
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <button 
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        <Routes>
          {/* Dashboard */}
          <Route path="/" element={
            <div>
              <h2 className="text-2xl font-bold mb-6">📊 Welcome to Admin Dashboard</h2>

              {/* Cards Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="p-4 bg-blue-500 text-white rounded-full">
                    📚
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{totalBooks}</h3>
                    <p className="text-gray-600">Total Books</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                  <div className="p-4 bg-green-500 text-white rounded-full">
                    👥
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{totalUsers}</h3>
                    <p className="text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Other Routes */}
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/view-users" element={<ViewUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
