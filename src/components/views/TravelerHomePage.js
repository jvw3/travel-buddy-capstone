import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Button } from "@mantine/core";
import { UpcomingTrip } from "./HomePageUpcomingTrips";

export const HomePageView = () => {
  const [userItineraries, setUserItineraries] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);



  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <div class="welcomemessage">
            <h1>Welcome Back, {currentUser?.fullName}</h1>
          </div>
          <div className="getstartedtext">
            <h2 className="homepageheader">Travel Buddy</h2>
            <Button></Button>
            <Link className="getStarted" to="/createnewtrip">
              Get started!
            </Link>
          </div>
        </div>
      </div>
      <div className="bottomsection">
        <div class="upcomingtripsheader">
          <h2 class="bottomsectionheader">Upcoming Trips</h2>
        </div>
      </div>
    </>
  );
};
