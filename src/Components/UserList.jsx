import React, { useState ,useEffect} from 'react';
import Logo from '../assets/MainLogo.svg';
import "../styles/UserList.css";
const UserNamesList = ({alluserdata}) => {
    console.log(alluserdata)
    const [users, setUsers] = useState( []);
     // Store users in state
    
   console.log(users);
    // const users = [
    //     { id: 1, initial: "P", name: "Piyam Goyal" },
    //     { id: 2, initial: "R", name: "Radhe Shyaam" },
    //     { id: 3, initial: "R", name: "Ravi Mishra" },
    //     { id: 4, initial: "R", name: "Ram Nagar" },
    //   ]

    useEffect(() => {
        if (Array.isArray(alluserdata)) {
          setUsers(alluserdata);
        } else {
          console.error("alluserdata is not an array", alluserdata);
        }
      }, [alluserdata]);

  return (
    <div className="maze_usernames_container">
      <h3 className="maze_usernames_title">User Lists</h3>
      <ul className="maze_usernames_list">
        {users.map((user) => (
          <li key={user.id} className="maze_username_item">
            <div className="maze_username_avatar"> <img src={Logo} className='main-img' alt="Image"/></div>
            <div className="maze_username_info">
              <span className={`maze_username_status ${user?.active === true ? 'maze_status_active' : 'maze_status_inactive'}`}></span>
              <span className="maze_username_text">{user?.first_name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNamesList;