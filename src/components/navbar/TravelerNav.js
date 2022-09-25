import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { Button } from "@mantine/core";
import { Text, Avatar } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="container-fluid">
        <ul className="navbar">
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            <Text size="lg">Home</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/community");
            }}
          >
            <Text size="lg">Community</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/trips");
            }}
          >
            <Text size="lg">My Trips</Text>
          </Button>
          <Button
            radius="md"
            variant="gradient"
            gradient={{ from: "purple", to: "blue" }}
            onClick={() => {
              navigate("/createnewtrip");
            }}
          >
            <Text size="lg">Create New Trip</Text>
          </Button>
          <li className="nav_link">
            <Link className="navbar_link" to="profile">
              Profile
            </Link>
          </li>
          <li></li>
          <li className="nav_logout">
            <Link
              className="navbar_link"
              to=""
              onClick={() => {
                localStorage.removeItem("travelbuddy_user");
                navigate("/landingpage", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
          {/* {findInitials()} */}
        </ul>
      </div>
    </nav>
  );
};
