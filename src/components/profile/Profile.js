import { useEffect, useState } from "react";
import { Card, Text, Button, Title, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

//This component is responsible for rendering the full view of a users profile.
export const Profile = ({ searchTermState }) => {
  const [user, setUser] = useState({});
  const [userItineraries, setUserItineraries] = useState([]);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [filteredActivities, setFiltered] = useState([]);

  const navigate = useNavigate();

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  //useEffect hook responsible for fetching the current user data and storing it in user state Variable.
  useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject.id}`)
      .then((res) => res.json())
      .then((currentUserInfo) => {
        setUser(currentUserInfo);
      });
  }, []);

// useEffect hook responsible for fetching the full array of itinerary activities.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities`)
      .then((res) => res.json())
      .then((activities) => {
        setItineraryActivities(activities);
      });
  }, []);

// useEffect hook responsible for fetching all of the userItineraries for the current loggied in user.
  useEffect(() => {
    fetch(`http://localhost:8099/userItineraries?_expand=itinerary&userId=${appUserObject.userId}`)
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  }, []);



  useEffect(() => {
    const userActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (activity.itineraryId === itinerary.itineraryId) {
          userActivities.push(activity);
        }
      });
    });

    const searchedActivities = userActivities.filter((activity) => {
      return activity.description
        .toLowerCase()
        .startsWith(searchTermState.toLowerCase());
    });
    setFiltered(searchedActivities);
  }, [searchTermState]);

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
          </div>
        </Card>
      </div>
    </>
  );
};
