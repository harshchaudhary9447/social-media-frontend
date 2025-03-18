import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import Heart from "../assets/Heart.png";
import FilledHeart from "../assets/RedHeart.png";
import CommentLogo from "../assets/Comment_logo.png";
import ThreeDots from "../assets/three_dots.png";
import Comments from "./Comments";
import API from "../api/axiosInstance";

 // Import JWT decoder

const Post = ({ post, onDelete, onUpdate}) => {
  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(post.likes_count || 0);
  const [time, setTime] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedDescription, setUpdatedDescription] = useState(post.description);
  const [showAlert, setShowAlert] = useState(false);

  // Ref for dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (post?.created_at) {
      const date = new Date(post.created_at);
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true,  // Ensures AM/PM format
      });
      setTime(formattedTime);
    }
  }, [post?.created_at]);
  

  // Get logged-in user from JWT
  // const getUserFromToken = () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return null;
  //   try {
  //     return jwtDecode(token);
  //   } catch (error) {
  //     console.error("Invalid token", error);
  //     return null;
  //   }
  // };

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // console.log(loggedInUser?.data?.first_name);
  const isAdmin = loggedInUser?.data?.role === "admin"; // Ensuring scope-based role check
  const isPostCreator = loggedInUser?.data?.id == post?.user?.id; // Checking if user owns the post
  const canEditOrDelete = isAdmin || isPostCreator;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLike = useCallback(async () => {
    try {
      if (liked) {
        await API.delete(`/posts/${post.id}/likes`);
        setLikeCount((prev) => prev - 1);
      } else {
        await API.post(`/posts/${post.id}/likes`);
        setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("Error liking/unliking post:", error.response?.data || error.message);
    }
  }, [liked, post.id]);

  const handleDelete = useCallback(async () => {
    try {
      const url = isAdmin ? `/admin/posts/${post.id}` : `/posts/${post.id}`;
      await API.delete(url);
      onDelete(post.id);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  }, [post.id, isAdmin]);
  

  const handleUpdate = useCallback(async () => {
    try {
      const url = isAdmin ? `/admin/posts/${post.id}` : `/posts/${post.id}`;
      const response = await API.patch(url, {
        // title: updatedTitle,
        description: updatedDescription,
      });
      console.log("Post updated successfully:", response.data);
      setEditing(false);
      if (onUpdate) {
       // console.log(response.data.post);
        onUpdate(response.data.post);
      } else {
        console.warn("onUpdate function is not defined.");
      }
    } catch (error) {
      console.error("Error updating post:", error.response?.data || error.message);
    }
  }, [post.id, updatedTitle, updatedDescription, isAdmin]);

  // console.log(post);
  
  return (
    <div className="post">
      {showAlert && <div className="alert-center">"Post Deleted successfully"</div>}

      <div className="post-header">
        {/* {editing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="edit-input"
          />
        ) : (
          
        )} */}
        <Link to={`/posts/${post.id}`}>
            <h2>{post?.user?.first_name || post?.title}</h2>
          </Link>

        <div className="kuch-bhi">
        <span className="post-time">
  {time} <span style={{ marginLeft: "5px", textTransform: "capitalize" }}>{post.visibility}</span>
</span>


          {/* Show three-dot menu only if user is admin or post creator */}
          {canEditOrDelete && (
            <div className="dropdown-container" ref={dropdownRef}>
              <img
                src={ThreeDots}
                alt="Three Dots"
                className="three-dots"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => setEditing((prev) => !prev)}>
                    {editing ? "Cancel" : "Edit"}
                  </button>
                  <button className="dropdown-item delete" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
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
      </div>

      <div className="post-actions">
        <div className="btn-img" onClick={handleLike}>
          <img src={liked ? FilledHeart : Heart} alt="Like" />
          <button>{liked ? "Unlike" : "Like"}</button>
        </div>
        <div className="btn-img">
          <img src={CommentLogo} alt="Comment" />
          <button onClick={() => setShowAll((prev) => !prev)}>Comments</button>
        </div>
      </div>

      <div className="post-comment-box">
        <Comments post={post} showAll={showAll} />
      </div>
    </div>
  );
};

export default Post;
