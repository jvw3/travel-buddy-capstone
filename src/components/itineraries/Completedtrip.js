import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Image, Text, Button, Badge } from "@mantine/core";

export const CompletedTrip = ({
  isComplete,
  departureDate,
  returnDate,
  userItineraryObject,
  itineraryId,
  setUserItineraries,
}) => {
  const [itineraryLocations, setItineraryLocations] = useState([]);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  useEffect(() => {
    fetch(
      `http://localhost:8099/itineraryLocations?_expand=itinerary&_expand=location`
    )
      .then((res) => res.json())
      .then((itineraryLocationsArray) => {
        setItineraryLocations(itineraryLocationsArray);
      });
  }, []);

  const foundLocation = itineraryLocations.find(
    (location) => location.itineraryId === userItineraryObject.itineraryId
  );

  const getUpdatedItineraryListForUser = () => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject.id}`
    )
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  };

  const renderDeleteButton = () => {
    return (
      <button
        onClick={() => {
          if (window.confirm("Press OK to confirm your delete.")) {
            fetch(`http://localhost:8099/itineraries/${itineraryId}`, {
              method: "DELETE",
            }).then(() => {
              getUpdatedItineraryListForUser();
            });
          } else {
            return "";
          }
        }}
        className="deletebutton"
      >
        Delete Trip
      </button>
    );
  };

  return (
    <>
      {isComplete ? (
          <Card withBorder>
            <div className={foundLocation?.location.city + "pic"}></div>
            <Badge color="green">Completed</Badge>
            <div>Departing on: {departureDate}</div>
            <div>Returning on: {returnDate}</div>
            <div className="buttonsandlinks">
              <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>
                Expand Trip View
              </Link>
              {renderDeleteButton()}
            </div>
          </Card>
      ) : (
        ""
      )}
    </>
  );
};
