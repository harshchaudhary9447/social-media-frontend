import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Comment.css";

const Comments = ({ post, showAll }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  //console.log(post);
  useEffect(() => {
    // fetchComments();
  }, [comments]);

  // const fetchComments = async () => {
  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
  //     if (!token) {
  //       console.error("No token found, user must log in");
  //       return;
  //     }
  
  //     const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Send token in headers
  //       },
  //     });
  //     setComments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching comments:", error.response?.data || error.message);
  //   }
  // };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.post(
        `http://localhost:3000/posts/${post.id}/comments`,
        { content: newComment }, // Corrected payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setComments([...comments, response.data]); // Append new comment
      setNewComment("");
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
      {!showAll && post?.comments?.length > 0 && (
        <div className="recent-comment">
          <strong>{post?.comments[post?.comments?.length - 1].user?.first_name || "Anonymous"}</strong> {/* User Name */}
          <p>{post.comments[post.comments.length - 1].content}</p>
          <span className="time">2h</span>
        </div>
      )}

      {/* Show all comments when expanded */}
      {showAll && (
        <ul className="all-comments">
          {post?.comments?.map((comment) => (
            <li key={comment.id}>
              <strong>{post?.user?.first_name || "Anonymous"}</strong> {/* User Name */}
              <p>{comment.content}</p>
              <span className="time">2h</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
