import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.css";
import { Button } from "@mantine/core";
import { Menu } from "@mantine/core";
import {
  IconUserCheck,
  IconLogout,
} from "@tabler/icons";

//This component renders the NavBar for the admin.
export const AdminNavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

// useEffect hook fetches the current user data and stores it in currentUser.
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
        <Link to="/">
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
            <Button size="md" color="violet">
              <IconUserCheck />{" "}{currentUser.fullName}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Admin Priviledges</Menu.Label>
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
