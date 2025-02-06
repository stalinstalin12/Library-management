import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import AdminDashboard from "./components/adminHome";
import AddBook from "./components/addBook";
import ViewUsers from "./components/viewUsers";
import Signup from "./components/signup";
import Home from "./components/home";

// import AdminDashboard from "./components/AdminDashboard";
// import AddBook from "./components/AddBook";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/add-book" element={<AddBook />} /> */
         <Route path="/adminHome" element={<AdminDashboard/>} />
         <Route path="/add-book" element={<AddBook/>} />
         <Route path="/view-users" element={<ViewUsers/>} />


      </Routes>
    </Router>
  );
}

export default App;
