import React from "react";
import { Link } from "react-router-dom";

function RightSideBar({ users }) {
  console.log(users);
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/profile/${user._id}`} style={{ cursor: "pointer" }}>
              {user.fullname}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightSideBar;
