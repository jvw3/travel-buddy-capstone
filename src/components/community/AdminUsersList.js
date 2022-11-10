
import { useState, useEffect } from "react";
import { AdminIndividualUser } from "./AdminIndividualUser";
import { Title, Center } from "@mantine/core";
import { useFetch } from "../api/APImanager";

// This component is responsible for rendering the full list of users for the admin view.
export const UserList = () => {
const[allUsers, setUsers] = useState([])

useFetch("http://localhost:8099/users", setUsers);

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