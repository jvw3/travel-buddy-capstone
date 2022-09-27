import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { Button } from "@mantine/core";
import { Text, Avatar, Group, Menu } from "@mantine/core";
import { IconUserCircle, IconLogout, IconCirclePlus, IconNotebook, IconPlaneTilt } from "@tabler/icons";
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
  //     <Avatar
  //       size="md"
  //       radius="xl"
  //       variant="gradient"
  //       gradient={{ from: "purple", to: "blue" }}
  //     >
  //       {firstinitial.charAt(0)}
  //       {lastinitial.charAt(0)}
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
        <Menu trigger="hover" openDelay={50} closeDelay={200}>
          <Menu.Target>
            <Button color="violet" >Trips</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Itineraries</Menu.Label>
            <Menu.Item
              icon={<IconPlaneTilt size={14} />}
              onClick={() => {
                navigate("/trips");
              }}
            >
              My Itineraries 
            </Menu.Item>
            <Menu.Item
              icon={<IconCirclePlus size={14} />}
              onClick={() => {
                navigate("/createnewtrip");
              }}
            >
              Create New Itinerary
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu trigger="hover" openDelay={50} closeDelay={200}>
          <Menu.Target>
            <Button color="violet" >User</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>My Account</Menu.Label>
            <Menu.Item
              icon={<IconUserCircle size={14} />}
              onClick={() => {
                navigate("/profile");
              }}
            >
              View Profile
            </Menu.Item>
            <Menu.Item
              icon={<IconNotebook size={14} />}
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Reviews
            </Menu.Item>
            <Menu.Divider />
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              icon={<IconLogout size={14} />}
              onClick={() => {
                localStorage.removeItem("travelbuddy_user");
                navigate("/", { replace: true });
              }}
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </ul>
    </nav>
  );
};
