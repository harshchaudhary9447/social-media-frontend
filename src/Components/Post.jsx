import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import Heart from "../assets/Heart.png";
import CommentLogo from "../assets/Comment_logo.png";
import ThreeDots from "../assets/three_dots.png";
import Comments from "./Comments";
import axios from "axios";

const Post = ({ post, onDelete, onUpdate }) => {
  const [comments, setComments] = useState([]);
  const [time, setTime] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedDescription, setUpdatedDescription] = useState(post.description);

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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in");
        return;
      }
      const response = await axios.get(`http://localhost:3000/posts/${post.id}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error.response?.data || error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.delete(`http://localhost:3000/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Post deleted successfully");
  
      onDelete(post.id); // Notify parent to remove post from state
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };
  

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.put(
        `http://localhost:3000/posts/${post.id}`,
        { title: updatedTitle, description: updatedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Post updated successfully:", response.data);
  
      onUpdate(response.data); // Notify parent to update post in state
  
      setEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  

  return (
    <div className="post">
      <div className="post-header">
        {editing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          <Link to={`/posts/${post.id}`}>
            <h2>{post?.user?.first_name}</h2>
          </Link>
        )}
      <div className="kuch-bhi">
        <span className="post-time">{time} · Public</span>

        {/* Three Dots Dropdown */}
        <div className="dropdown-container">
          <img
            src={ThreeDots}
            alt="Three Dots"
            className="three-dots"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </button>
              <button className="dropdown-item delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      <div className="post-content">
        {editing ? (
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="edit-input"
          />
        ) : (
          <p>{post.description}</p>
        )}
      </div>

      {editing && (
        <button className="save-btn" onClick={handleUpdate}>
          Save
        </button>
      )}

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
