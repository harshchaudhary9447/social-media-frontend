import React from 'react';

import "../styles/UserList.css";
const UserNamesList = () => {

    const users = [
        { id: 1, initial: "P", name: "Piyam Goyal" },
        { id: 2, initial: "R", name: "Radhe Shyaam" },
        { id: 3, initial: "R", name: "Ravi Mishra" },
        { id: 4, initial: "R", name: "Ram Nagar" },
      ]
  return (
    <div className="maze_usernames_container">
      <h3 className="maze_usernames_title">User Names</h3>
      <ul className="maze_usernames_list">
        {users.map((user) => (
          <li key={user.id} className="maze_username_item">
            <div className="maze_username_avatar">M</div>
            <div className="maze_username_info">
              <span className={`maze_username_status ${user.status === 'active' ? 'maze_status_active' : 'maze_status_inactive'}`}></span>
              <span className="maze_username_text">{user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNamesList;