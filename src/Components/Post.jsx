import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Post.css';
import Heart from '../assets/Heart.png';
import CommentLogo from '../assets/Comment_logo.png';
import Comments from './Comments';
import axios from 'axios';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!post) return;

    if (post?.created_at) {
      const date = new Date(post.created_at);
      const hours = date.getHours();
      setTime(`${hours}:00 AM`);
    }
  }, [post]);

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${post.id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${post.id}`);
      onDelete(post.id); // Notify parent component to remove the post from the list
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <Link to={`/posts/${post.id}`}>
          <h2>{post.title}</h2>
        </Link>
        
        <span className="post-time">{time} · Public</span>
      </div>
      <div className="post-content">
        <p>{post.description}</p>
      </div>
      <div className="post-stats">
        <span>221 Likes</span>
        <span>{comments.length} Comments</span>
      </div>
      <div className="post-actions">
        <div className="btn-img">
          <img src={Heart} alt="Like" />
          <button>Like</button>
        </div>
        <div className="btn-img">
          <img src={CommentLogo} alt="Comment" />
          <button onClick={() => setShowAll(!showAll)}>Comments</button>
        </div>
      </div>
      <div className="post-comment-box">
        <Comments postId={post.id} showAll={showAll} />
      </div>
    </div>
  );
};

export default Post;