import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import Heart from '../assets/Heart.png';
import CommentLogo from '../assets/Comment_logo.png';
import '../styles/Post.css';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      setPost(response.data);
      const date = new Date(response.data.created_at);
      const hours = date.getHours();
      setTime(`${hours}:00 AM`);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post">
      <div className="post-header">
        <h2>{post.title}</h2>
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

export default PostDetail;