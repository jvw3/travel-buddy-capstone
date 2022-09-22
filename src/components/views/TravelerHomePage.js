import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { UserItineraries } from "../itineraries/MyTrips";
import { UpcomingTrip } from "./HomePageUpcomingTrips";

const localAppUser = localStorage.getItem("travelbuddy_user");
const appUserObject = JSON.parse(localAppUser);

export const HomePageView = () => {
  const [userItineraries, setUserItineraries] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject?.id}`
    )
      .then((res) => res.json())
      .then((myItinerariesArray) => {
        setUserItineraries(myItinerariesArray);
      });
  }, []);

  //   const displayedUpcomingTrips = userItineraries.slice(0, 3);

  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <h1 className="homepageheader">Travel Buddy</h1>
          <Link className="getStarted" to="/createnewtrip">
            Get started!
          </Link>
        </div>
      </div>
      <div className="bottomsection">
        <h2>Upcoming Trips</h2>
        <section className="upcomingtripcontainer">
          {userItineraries.map(trip => (
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
