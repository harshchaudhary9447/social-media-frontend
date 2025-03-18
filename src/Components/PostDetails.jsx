import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import API from "../api/axiosInstance";  
import Heart from '../assets/Heart.png';
import CommentLogo from '../assets/Comment_logo.png';
import '../styles/Post.css';

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null); // Try to get post from navigation state
  const [time, setTime] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!post) {
      fetchPost();
    } else {
      formatTime(post.created_at);
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await API.get(`/posts/${postId}`);
      if (response.data) {
        setPost(response.data);
        formatTime(response.data.created_at);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return;
    const date = new Date(timestamp);
    const hours = date.getHours();
    setTime(`${hours}:00 AM`);
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
        <span>{post.likes_count} Likes</span>
        <span>{post.comments.length} Comments</span>
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

      {/* Show Comments Directly Here */}
      {showAll && (
        <div className="comments-section">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <strong>{comment.user.first_name} {comment.user.last_name}</strong>
                <p>{comment.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
