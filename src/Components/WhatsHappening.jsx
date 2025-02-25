import React from 'react';
import '../styles/WhatsHappening.css';
import { useNavigate } from 'react-router-dom';
import { LuVideo } from "react-icons/lu";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";

const WhatsHappening = () => {

  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate('/create-post'); // Navigate to the create-post route
  };

  return (
    <div className="whats-happening">
      <div className="what-happening-right">
        <input type="text" placeholder="Whats happening ?" />
      </div>
      <div className='main-button'>
        <div className="buttons">
          <button className='live-video'><LuVideo  className='live'/> Live Video</button>
          <button className='live-video'><MdOutlineAddAPhoto className='photo'/>  Photo/Video</button>
          <button className='live-video'> <FaRegSmile className='live'/> Feeling</button>

        </div>

        <div className='blue-button'>
          <button onClick={handlePostClick}> Create Post</button>
        </div>
      </div>


    </div>
  );
};

export default WhatsHappening;