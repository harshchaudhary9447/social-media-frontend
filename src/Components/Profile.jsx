import React from "react";
import Logo from "../assets/MainLogo.svg";
import { useOutletContext } from "react-router-dom";
import "../styles/Profile.css";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { setnavinput } = useOutletContext();
  setnavinput(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-card-body">
          <img className="profile-img" src={Logo} alt="Profile" />
          <h2 className="profile-name">
            {user?.data?.first_name} {user?.data?.last_name}
          </h2>
          <p className="profile-role">
            {user?.data?.role === "admin" ? "Admin" : "User"}
          </p>

          <div className="profile-stats">
            <div className="stat">
              <p className="stat-value">{user?.data?.total_posts}</p>
              <p className="stat-title">Posts</p>
            </div>
            <div className="stat">
              <p className="stat-value">{user?.data?.total_comments}</p>
              <p className="stat-title">Comments</p>
            </div>
            <div className="stat">
              <p className="stat-value">{user?.data?.total_likes}</p>
              <p className="stat-title">Likes</p>
            </div>
          </div>

          <div className="profile-btns">
            <a href={`mailto:${user?.data?.email}`}>
              <button className="contact-btn">Contact</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
