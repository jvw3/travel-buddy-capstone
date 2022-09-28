import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { Button } from "@mantine/core";
import { Text, Avatar, Group, Menu } from "@mantine/core";
import {
  IconUserCircle,
  IconLogout,
  IconCirclePlus,
  IconNotebook,
  IconPlaneTilt,
  IconFriends,
  IconBookmarks,
} from "@tabler/icons";
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


  return (
    <nav className="navbar">
      <section className="logoandnavtextcontainer">
        <Link to="/home">
          <div className="travelbuddylogo"></div>
        </Link>
          <div className="navtext">Travel Buddy</div>
      </section>
      <section className="navbuttoncontainer">
        <Menu
          transition="scale"
          trigger="hover"
          openDelay={50}
          closeDelay={100}
        >
          <Menu.Target>
            <Button size="md" color="cyan">
              Community
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Community Hub</Menu.Label>
            <Menu.Item
              icon={<IconFriends size={14} />}
              onClick={() => {
                navigate("/community");
              }}
            >
              Community Home Page
            </Menu.Item>
            <Menu.Item
              icon={<IconNotebook size={14} />}
              onClick={() => {
                navigate("/community/reviews");
              }}
            >
              Reviews
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu
          transition="scale"
          trigger="hover"
          openDelay={50}
          closeDelay={100}
        >
          <Menu.Target>
            <Button size="md" color="violet">
              Trips
            </Button>
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
        <Menu
          transition="scale"
          trigger="hover"
          openDelay={50}
          closeDelay={100}
        >
          <Menu.Target>
            <Button size="md" color="violet">
            <IconUserCircle /> {currentUser.fullName}
            </Button>
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
              icon={<IconBookmarks size={14} />}
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Activities
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
      </section>
    </nav>
  );
};
