import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PostDetails from "./Components/PostDetails";
import Post from "./Components/Post";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignUp/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/post" element={<Post />} />
        <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
