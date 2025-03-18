// import { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
// import API from "../api/axiosInstance";
// import Navbar from "../Components/Navbar";
// import Sidebar from "../Components/Sidebar";
// import "../styles/Home.css";
// import "../styles/Post.css";

// const WhatsHappening = lazy(() => import("../Components/WhatsHappening"));
// const Post = lazy(() => import("../Components/Post"));
// const ManageUser = lazy(() => import("../Components/ManagerUser"));
// const UserReport = lazy(() => import("../Components/UserReport"));
// const UserNamesList = lazy(() => import("../Components/UserList"));

// const Home = ({ onLogout }) => {
//   const [posts, setPosts] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [allUserData, setAllUserData] = useState({});
//   const [activeSection, setActiveSection] = useState("feed");

//   // Fetch user role & data
//   const fetchUserRole = useCallback(async () => {
//     try {
//       const response = await API.get("/admin/users");
//       setIsAdmin(!!response?.data); // Convert response to boolean
//       setAllUserData(response.data || {});
//     } catch (error) {
//       console.error("Error fetching user role:", error);
//     }
//   }, []);

//   // Fetch posts
//   const fetchPosts = useCallback(async () => {
//     try {
//       const response = await API.get("/posts");
//       setPosts(response?.data || []);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUserRole();
//     fetchPosts();
//   }, [fetchUserRole, fetchPosts]);

//   // Memoized function to handle post deletion
//   const handleDeletePost = useCallback((postId) => {
//     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
//   }, []);

//   // Memoized function to handle new post addition
//   const handleNewPost = useCallback((newPost) => {
//     setPosts((prevPosts) => [newPost, ...prevPosts]);
//   }, []);

//   return (
//     <div>
//       {/* <Navbar /> */}
//       <div className="home-container1">
//         {/* <Sidebar isAdmin={isAdmin} setActiveSection={setActiveSection} onLogout={onLogout} /> */}
//         <div className="main-content1">
//           <Suspense fallback={<div>Loading...</div>}>
//             {activeSection === "manageUser" && isAdmin ? (
//               <ManageUser alluserdata={allUserData} isAdmin={isAdmin} />
//             ) : activeSection === "reports" && isAdmin ? (
//               <UserReport />
//             ) : (
//               <div className="main-item1">
//                 <div className="left-side-posts">
//                   <WhatsHappening onNewPost={handleNewPost} />
//                   {posts.map((post) => (
//                     <Post key={post.id} isAdmin={isAdmin} post={post} onDelete={handleDeletePost} />
//                   ))}
//                 </div>
//                 {isAdmin && <UserNamesList alluserdata={allUserData} />}
//               </div>
//             )}
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState, useCallback, lazy, Suspense, memo } from "react";
import API from "../api/axiosInstance";
import "../styles/Home.css";
import "../styles/Post.css";
import { useOutletContext, Navigate,useNavigate } from "react-router-dom";

const WhatsHappening = memo(lazy(() => import("../Components/WhatsHappening")));
const Post = memo(lazy(() => import("../Components/Post")));
const UserNamesList = memo(lazy(() => import("../Components/UserList")));

const Home = () => {
  const { setnavinput } = useOutletContext();
  setnavinput(true);
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUserData, setAllUserData] = useState({});

  // Fetch user role & data
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user?.data?.first_name);
  
  const fetchUserRole = useCallback(async () => {
    try {
      if (user?.data?.role === "admin") {  // Check role inside function
        const response = await API.get("/admin/users");
        setIsAdmin(!!response?.data);
        setAllUserData(response.data || {});
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  }, []);
  
  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]); // Run when component mounts
  

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      const userRole = user?.data?.role; // Assuming you store role in localStorage
  
      const endpoint = userRole === "admin" ? "/admin/posts" : "/posts"; // Choose API based on role
      const response = await API.get(endpoint);
  
      setPosts(response?.data || []);
    
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);
  
  
  useEffect(() => {
    fetchUserRole();
    fetchPosts();
  }, [fetchUserRole, fetchPosts]);

  // console.log(allUserData);
  console.log(" Posts");
  console.log( posts[0]);
  // Memoized function to handle post deletion
  const handleDeletePost = useCallback((postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }, []);

  // Memoized function to handle new post addition
  const handleNewPost = useCallback((newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  const handleUpdatePost = useCallback((updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  }, []);
  
  

  return (
    <div className="main-item1">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="left-side-posts">
          <WhatsHappening onNewPost={handleNewPost} />
          {posts.map((post) => (
            <Post key={post.id} isAdmin={isAdmin} post={post} onDelete={handleDeletePost} onUpdate={handleUpdatePost}/>
          ))}
        </div>
        {isAdmin && <UserNamesList alluserdata={allUserData} />}
      </Suspense>
    </div>
  );
};

export default Home;
