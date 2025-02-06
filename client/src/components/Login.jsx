import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", { email, password });
      console.log(response.data)
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("usertype", response.data.data.user_type);

      console.log(localStorage)
      if (localStorage.getItem('usertype') === "67a45e7b7a5cd482f9c5099a") {
        navigate("/adminHome"); // Redirect to Admin Home
    } else {
        navigate("/"); // Redirect to Normal User Home
    }
    } catch (error) {
        console.log(error)
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg max-w-sm w-full border border-white/20">
        <h2 className="text-3xl font-semibold text-white text-center">Login</h2>
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-white mt-4 text-center">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-300 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
