import React from 'react';
import '../styles/WhatsHappening.css';
import { useNavigate } from 'react-router-dom';

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
        <button>Live Video</button>
        <button>Photo/Video</button>
        <button>Feeling</button>
        
      </div>

      <div className='blue-button'>
      <button onClick={handlePostClick}> Create Post</button>
      </div>
      </div>
      

    </div>
  );
};

export default WhatsHappening;