
import { useState, useEffect } from "react";
import { AdminIndividualUser } from "./AdminIndividualUser";
import { Title } from "@mantine/core";


export const UserList = () => {
const[allUsers, setUsers] = useState([])


useEffect(() => {
  fetch(`http://localhost:8099/users`)
    .then((res) => res.json())
    .then((currentUserInfo) => {
      setUsers(currentUserInfo);
    });
}, []);

const userList = allUsers.filter(user => {
  return user.isAdmin === false
})

    return (
      <>
      <Title>All Users</Title>
        <div className="userlistcontainer">
          {userList.map((user) => (
            <AdminIndividualUser
              key={`user--${user?.id}`}
              fullName={user?.fullName}
              email={user?.email}
              hometown={user?.hometown}
              isSuspended={user?.isSuspended}
              id={user?.id}
            />
          ))}
        </div>
      </>
    );
}