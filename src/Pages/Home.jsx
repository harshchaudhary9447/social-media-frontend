import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../Components/Navbar";
import Post from '../Components/Post';
import WhatsHappening from "../Components/WhatsHappening";
import '../styles/Home.css';
import '../styles/Post.css';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    console.log(posts);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  console.log(posts);
  return (
    <div className="main-div">
      {/* Header */}
     <Navbar/>
     <div className="main-item">
     <WhatsHappening/>
     {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
     </div>
      
    </div>
  );
};



export default Home;
