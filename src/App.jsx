import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Home from "./Pages/Home";
import PostDetails from "./Components/PostDetails";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import CreateUser from "./Components/CreateUser";
import BulkUser from "./Components/Bulk-User";
import Layout from "./Components/Layout"; 
import UserReport from "./Components/UserReport";
import ManageUser from "./Components/ManagerUser";
import API from "./api/axiosInstance";
import ProfilePage from "./Components/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUserData, setAllUserData] = useState({});
  const [navinput, setnavinput] = useState(true);

  // Fetch user role & data
  const fetchUserRole = useCallback(async () => {
    try {
      if (!token) return; // Avoid fetching if not logged in
      const response = await API.get("/admin/users");
      setIsAdmin(response?.data != null);
      setAllUserData(response.data || {});
    } catch (error) {
      console.error("Error fetching user role:", error);
      setIsAdmin(false); // Ensure non-admin users don't get admin privileges
    }
  }, [token]);

  useEffect(() => {
    fetchUserRole();
  }, [token]); // Fetch user role whenever token changes

  // useEffect(() => {
  //   const handleStorage = () => setToken(localStorage.getItem("token"));
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUserRole(); // Fetch user role immediately after login
  };

  const handleSignUp = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    fetchUserRole(); // Ensure user role is updated on sign-up
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAdmin(false); // Reset admin state on logout
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <SignUp onLogin={handleSignUp} />} />
        <Route path="/signin" element={token ? <Navigate to="/" /> : <SignIn onLogin={handleLogin} />} />

        {/* Protected Routes with Layout */}
        {token ? (
          <Route element={<Layout onLogout={handleLogout} isAdmin={isAdmin} allUserData={allUserData} setnavinput={setnavinput} navinput={navinput}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/bulk-user" element={<BulkUser />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/user-report" element={<UserReport />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
