
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../Components/Navbar"
import Post from "../Components/Post"
import WhatsHappening from "../Components/WhatsHappening"
import Sidebar from "../Components/Sidebar"
import "../styles/Home.css"
import "../styles/Post.css"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId)); // Remove the deleted post
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
      if (!token) {
        console.error("No token found, user must log in");
        return;
      }
  
      const response = await axios.get("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
  
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <Navbar />
    
    <div className="home-container1">
      <Sidebar />
      <div className="main-content1">
        
        <div className="main-item1">
          <WhatsHappening />
          {posts.map((post) => (
            <Post 
            key={post.id} 
            post={post} 
            onDelete={handlePostDelete} 
            onUpdate={handlePostUpdate} 
          />
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home

