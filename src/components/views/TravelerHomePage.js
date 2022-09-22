import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { UserItineraries } from "../itineraries/MyTrips";
import { UpcomingTrip } from "./HomePageUpcomingTrips";



export const HomePageView = () => {
  const [userItineraries, setUserItineraries] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  useEffect(() => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject?.id}`
    )
      .then((res) => res.json())
      .then((myItinerariesArray) => {
        setUserItineraries(myItinerariesArray);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject?.id}`)
      .then((res) => res.json())
      .then((currentUser) => {
        setCurrentUser(currentUser);
      });
  }, []);

    const displayedUpcomingTrips = userItineraries.slice(0, 3);

  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <div class="welcomemessage">
            <h1>Welcome Back, {currentUser?.name}</h1>
          </div>
          <div className="getstartedtext">
          <h2 className="homepageheader">Travel Buddy</h2>
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
        <section className="upcomingtripcontainer">
          {displayedUpcomingTrips.map((trip) => (
            <UpcomingTrip
              key={`itinerary--${trip?.id}`}
              tripObject={trip}
              departureDate={trip?.itinerary?.departureDate}
              returnDate={trip?.itinerary?.returnDate}
              id={trip?.id}
              userItineraries={userItineraries}
            />
          ))}
        </section>
      </div>
    </>
  );
};
