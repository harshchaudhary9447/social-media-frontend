import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ onLogout, isAdmin, allUserData, navinput,setnavinput}) => {
  return (
    <div>
      <Navbar navinput={navinput}/>
      <div className="home-container1">
        <Sidebar isAdmin={isAdmin} onLogout={onLogout}  />
        <div className="main-content1">
          <Outlet context={{ isAdmin, allUserData,setnavinput }} /> {/* Pass to child components */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
