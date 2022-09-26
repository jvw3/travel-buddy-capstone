import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { Button } from "@mantine/core";
import { Text, Avatar, Group } from "@mantine/core";
import { IconUser, IconLogout, IconCirclePlus } from "@tabler/icons";
import { ThemeIcon } from "@mantine/core";

//This component renders the NavBar for users taht are logged in as travelers.
export const TravelerNavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  //   useEffect(() => {
  //     fetch(`http://localhost:8099/itineraries/${itineraryId}`)
  //       .then((res) => res.json())
  //       .then((myItinerary) => {
  //         update(myItinerary);
  //       });
  //   }, []);

  useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject?.id}`)
      .then((res) => res.json())
      .then((currentUser) => {
        setCurrentUser(currentUser);
      });
  }, []);

  // const findInitials = () => {
  //   let splitName = currentUser.fullName.split(" ");
  //   let firstinitial = splitName[0];
  //   let lastinitial = splitName[1];
  //   return (
  //     <Avatar>
  //       {firstinitial}
  //       {lastinitial}
  //     </Avatar>
  //   );
  // };


  return (
    <nav className="navbar navbar-inverse">
        <ul className="navbar">
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <Text size="md">Home</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/community");
            }}
          >
            <Text size="md">Community</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/trips");
            }}
          >
            <Text size="md">My Trips</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/createnewtrip");
            }}
          >
          <IconCirclePlus size={18}/> <Text size="md">Create New Trip</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
              <IconUser />
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              localStorage.removeItem("travelbuddy_user");
              navigate("/landingpage", { replace: true });
            }}
          >
              <IconLogout />
          </Button>
        </ul>
    </nav>
  );
};
