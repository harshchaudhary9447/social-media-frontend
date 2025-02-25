import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreatePost.css'
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {

      const navigate = useNavigate();
    const handlePostClick = () => {
        navigate('/'); // Navigate to the create-post route
      };
     
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'http://localhost:3000/posts', 
        { post: { title, description } },  // Request body
        { headers: { Authorization: `Bearer ${token}` } } // Headers as a separate object
      );
      // onPostCreated(response.data); // Notify parent component
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button onClick={handlePostClick} type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;