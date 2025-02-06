import { useEffect, useState } from "react";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/viewUsers")
      .then(response => {
        console.log("✅ API Response:", response.data);
        setUsers(response.data.data || []);
      })
      .catch(error => {
        console.error("❌ API Error:", error);
        setError("Failed to fetch users.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
        👥 All Users
      </h2>

      {loading ? (
        <div className="text-center py-6 text-blue-600 text-lg font-semibold">
          Loading users...
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-600 font-semibold">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-medium">
              {users.map(user => (
                <tr key={user._id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-md 
                      ${user.user_type === 'admin' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {user.user_type === '67a45e7b7a5cd482f9c5099a' ? 'Admin' : 'User'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
