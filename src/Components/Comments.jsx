import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance"; // Use API instance
import "../styles/Comment.css";

const Comments = ({ post, showAll, updatePost }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user?.data?.first_name);

  useEffect(() => {
    setComments(post.comments || []);
  }, [post]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await API.post(
        `/posts/${post.id}/comments`,
        { content: newComment },
        // { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCommentData = response.data;
      
      // Update the local comments state
      setComments((prev) => [...prev, newCommentData]);
      setNewComment("");

      // Update the post in the parent component (Home.jsx)
     // updatePost(post.id, newCommentData);
      
    } catch (error) {
      console.error("Error creating comment:", error.response?.data || error.message);
    }
  };

  return (
    <div className="comments-section">
      {/* Comment Input Box */}
      <div className="comment-box">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit" onClick={handleCommentSubmit}> ➤ </button>
      </div>

      {/* Show only the most recent comment if not expanded */}
      {!showAll && comments.length > 0 && (
        <div className="recent-comment">
          <strong>{comments[comments.length - 1]?.user?.first_name || user?.data?.first_name}</strong>
          <p>{comments[comments.length - 1]?.content}</p>
        </div>
      )}

      {/* Show all comments when expanded */}
      {showAll && (
        <ul className="all-comments">
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user?.first_name || user?.data?.first_name}</strong>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
