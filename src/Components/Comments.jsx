import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Comment.css'
const Comments = ({ postId ,showAll}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
 

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/posts/${postId}/comments`, {
        comment: { content: newComment },
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
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

      {/* Show only recent comment if not expanded */}
      {!showAll && comments.length > 0 && (
        <div className="recent-comment">
          <strong>{comments[comments.length - 1].user}</strong> {/* User Name */}
          <p>{comments[comments.length - 1].content}</p>
          <span className="time">2h</span>
        </div>
      )}

      {/* Show all comments when expanded */}
      {showAll && (
        <ul className="all-comments">
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.user}</strong> {/* User Name */}
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
