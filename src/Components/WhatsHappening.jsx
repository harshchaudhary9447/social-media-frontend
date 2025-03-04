import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../api/axiosInstance";
import '../styles/WhatsHappening.css';
import { LuVideo } from "react-icons/lu";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";

const WhatsHappening = ({ onNewPost }) => {
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handlePostClick = async () => {
    if (!description.trim()) return; // Prevent empty posts

    try {
      const response = await API.post('/posts', { post: { title: "New Post", description } });

      onNewPost(response.data); // Immediately update posts in Home.jsx
      setDescription(''); // Clear input field
      setShowAlert(true);
      console.log("Post created");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };


  return (
    <div className="whats-happening">
      {showAlert && <div className="alert-center">Post created successfully!</div>}
      <div className="what-happening-right">
        <input 
          type="text" 
          placeholder="What's happening?" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='main-button'>
        <div className="buttons">
          <button className='live-video'><LuVideo className='live'/> Live Video</button>
          <button className='live-video'><MdOutlineAddAPhoto className='photo'/> Photo/Video</button>
          <button className='live-video'> <FaRegSmile className='live'/> Feeling</button>
        </div>
        <div className='blue-button'>
          <button onClick={handlePostClick}>Create Post</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
