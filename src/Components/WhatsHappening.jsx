import React, { useState } from 'react';
import API from "../api/axiosInstance";
import '../styles/WhatsHappening.css';
import { LuVideo } from "react-icons/lu";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";

const WhatsHappening = ({ onNewPost }) => {
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public'); // Default to public
  const [showAlert, setShowAlert] = useState(false);
  const [isPosting, setIsPosting] = useState(false); // To disable button

  const user = JSON.parse(localStorage.getItem("user"));

  const handlePostClick = async () => {
    if (!description.trim()) return;

    setIsPosting(true); // Disable button while posting

    try {
      const response = await API.post('/posts', { 
        post: { 
          title: user?.data?.first_name, 
          description,
          visibility 
        }
      });

      onNewPost(response.data); // Update posts in Home.jsx
      setDescription('');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
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

      {/* Visibility Selection using Radio Buttons */}
      <div className="visibility-selection">
        <label>
          <input 
            type="radio" 
            value="public" 
            checked={visibility === "public"} 
            onChange={() => setVisibility("public")}
          />
          <span>Public</span>
        </label>
        <label>
          <input 
            type="radio" 
            value="private" 
            checked={visibility === "private"} 
            onChange={() => setVisibility("private")}
          />
          <span>Private</span>
        </label>
      </div>

      <div className='main-button'>
        <div className='blue-button'>
          <button onClick={handlePostClick} disabled={isPosting}>
            {isPosting ? "Posting..." : "Create Post"}
          </button>
        </div>

        <div className="buttons">
          <button className='live-video'><LuVideo className='live'/> Live Video</button>
          <button className='live-video'><MdOutlineAddAPhoto className='photo'/> Photo/Video</button>
          <button className='live-video'> <FaRegSmile className='live'/> Feeling</button>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappening;
