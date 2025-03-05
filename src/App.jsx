import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/Home";
import PostDetails from "./Components/PostDetails";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Sync token state with localStorage
  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleSignUp = (newToken) => {
  //  localStorage.setItem("token", token.split(" ")[1]);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    console.log(token+"Inside");
  };

  console.log(token);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={token ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/signup" 
          element={token ? <Navigate to="/" /> : <SignUp onLogin={handleSignUp}/>} 
        />
        <Route 
          path="/signin" 
          element={token ? <Navigate to="/" /> : <SignIn onLogin={handleLogin} />} 
        />

        {/* Protected routes */}
        <Route 
          path="/" 
          element={token ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/posts/:postId" 
          element={token ? <PostDetails /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/create-post" 
          element={token ? <CreatePost /> : <Navigate to="/login" />} 
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;