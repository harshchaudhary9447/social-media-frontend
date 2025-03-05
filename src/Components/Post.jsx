import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import Heart from "../assets/Heart.png";
import FilledHeart from "../assets/RedHeart.png";
import CommentLogo from "../assets/Comment_logo.png";
import ThreeDots from "../assets/three_dots.png";
import Comments from "./Comments";
import axios from "axios";

const Post = ({ post,  isAdmin }) => {
  // const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [time, setTime] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedDescription, setUpdatedDescription] = useState(post.description);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const token = localStorage.getItem("token");

  console.log(post);
  useEffect(() => {
    if (!post) return;
    if (post?.created_at) {
      const date = new Date(post.created_at);
      const hours = date.getHours();
      setTime(`${hours}:00 AM`);
    }
  }, [post]);

  // useEffect(() => {
  //   checkIfLiked();
  // }, []);

  const handleCommentAdded = (newComment) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === newComment.post_id) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  

  // const checkIfLiked = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/posts/${post.id}/likes`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const userLiked = response.data.some(like => like.user_id === post.user_id);
  //     setLiked(userLiked);
  //   } catch (error) {
  //     console.error("Error checking like status:", error);
  //   }
  // };

  const handleLike = async () => {
    try {
      if (liked) {
        await axios.delete(`http://localhost:3000/posts/${post.id}/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(`http://localhost:3000/posts/${post.id}/likes`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikeCount(likeCount + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };
  // useEffect(() => {
  //   fetchComments();
  // }, [post.id]);

  // const fetchComments = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found, user must log in");
  //       return;
  //     }
  //     const response = await axios.get(`http://localhost:3000/posts/${post.id}/comments`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error.response?.data || error.message);
  //   }
  // };

  const triggerAlert = (message) => {
    console.log("Triggering alert with message:", message); // Debugging
    setAlertMessage(message);
    setShowAlert(true); // Show the alert
    console.log("showAlert set to true"); // Debugging
  };
  
  useEffect(() => {
    if (showAlert) {
      console.log("Alert is visible, setting timeout to hide it"); // Debugging
      const timer = setTimeout(() => {
        console.log("Hiding alert after timeout"); // Debugging
        setShowAlert(false);
      }, 3000);
  
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [showAlert]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (isAdmin) {
        await axios.delete(`http://localhost:3000/admin/posts/${post?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
      
        await axios.delete(`http://localhost:3000/posts/${post?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      console.log("Post deleted successfully");
      //onDelete(post.id); // Notify parent to remove post from state
      triggerAlert("Post deleted successfully!"); // Call triggerAlert here
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.patch(
        `http://localhost:3000/posts/${post.id}`,
        { title: updatedTitle, description: updatedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Post updated successfully:", response.data);
      // onUpdate(response.data); // Notify parent to update post in state
      setEditing(false);
      triggerAlert("Post updated successfully!"); // Call triggerAlert here
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="post ">
      {showAlert && (
  console.log("Rendering alert with message:", alertMessage), // Debugging
  <div className="alert-center">
    {alertMessage}
  </div>
)}

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
      <span>{likeCount} Likes</span>
        <span>{post?.comments?.length || 0} Comments</span>

      </div>
      <div className="post-actions">
      <div className="btn-img" onClick={handleLike}>
          <img src={liked ? FilledHeart : Heart} alt="Like" />
          <button>{liked ? "Unlike" : "Like"}</button>
        </div>
        <div className="btn-img">
          <img src={CommentLogo} alt="Comment" />
          <button onClick={() => setShowAll(!showAll)}>Comments</button>
        </div>
      </div>
      <div className="post-comment-box">
      <Comments 
        post={post} 
        showAll={showAll}
        onCommentAdded={handleCommentAdded}  // Add this prop
      />
      </div>
    </div>
  );
};

export default Post;