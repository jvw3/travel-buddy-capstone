import { useEffect, useState } from "react";
import { Card, Text, Button, Title, Center } from "@mantine/core";
import { json, useNavigate } from "react-router-dom";
import { useFetch } from "../api/APImanager";
//This component is responsible for rendering the full view of a users profile.
export const Profile = ({ searchTermState }) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

//useEffect hook responsible for fetching the current user data and storing it in user state Variable.

useFetch(`http://localhost:8099/users/${appUserObject.id}`, setUser)


  return (
    <>
      <div className="profilecontainer">
        <Card className="myprofile" withBorder shadow="lg">
          <Title className="profileheader" order={1}>My Profile</Title>
          <Center>
            <Button
              color="violet"
              variant="light"
              onClick={() => {
                navigate(`/profile/edit/${appUserObject.id}`);
              }}
            >
              Edit Profile
            </Button>
            <Button
              color="violet"
              onClick={() => {
                navigate("/profile/myactivities");
              }}
            >
              View My Activities
            </Button>
          </Center>
          <div className="profileinfo">
            <Text>Name: {user.fullName}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Hometown: {user.hometown} </Text>
            <Text>Total Trips Completed</Text>
            <Text>Total Activities Completed</Text>
            <Text>Total Reviews Shared</Text>
          </div>
        </Card>
      </div>
    </>
  );
};
