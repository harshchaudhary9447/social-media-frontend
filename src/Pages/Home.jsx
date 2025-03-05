import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import WhatsHappening from "../Components/WhatsHappening";
import Sidebar from "../Components/Sidebar";
import ManageUser from "../Components/ManagerUser";
import UserReport from "../Components/UserReport"; // Import report component
import "../styles/Home.css";
import "../styles/Post.css";
import UserNamesList from "../Components/UserList";

const Home = ({onLogout}) => {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUserData, setAllUserData] = useState({});
  const [activeSection, setActiveSection] = useState("feed"); // "feed" | "manageUser" | "reports"

  // Refresh posts immediately after creating a new one
  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post at the beginning
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3000/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAdmin(response.data !== undefined);
        setAllUserData(response.data);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must log in");
        return;
      }

      const response = await axios.get("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="home-container1">
        <Sidebar isAdmin={isAdmin} setActiveSection={setActiveSection} onLogout={onLogout}/>
        <div className="main-content1">
          {activeSection === "manageUser" && isAdmin ? (
            <ManageUser alluserdata={allUserData} />
          ) : activeSection === "reports" && isAdmin ? (
            <UserReport />
          ) : (
            <div className="main-item1">
              <div className="left-side-posts">
              <WhatsHappening onNewPost={handleNewPost} />
              {posts.map((post) => (
                <Post isAdmin={isAdmin}  post={post} />
              ))}
            </div>
           
            {isAdmin && (<div>
              <UserNamesList alluserdata={allUserData}/>
              </div>
           
            )}  
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
