import { Link } from "react-router-dom";
import { useState, useEffect} from "react"

export const CompletedTrip = ({
  isCurrent,
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
          fetch(`http://localhost:8099/itineraries/${itineraryId}`, {
            method: "DELETE",
          }).then(() => {
            getUpdatedItineraryListForUser();
          });
        }}
        className="deletebutton"
      >
        Delete Trip
      </button>
    );
  };

  return (
    <>
    {
        isComplete
        ?  <div className="completedtripscontainer">
        <section className="itinerary">
          <div className={foundLocation?.location.city + "pic"}></div>
          <div>Departing on: {departureDate}</div>
          <div>Returning on: {returnDate}</div>
          <div className="buttonsandlinks">
            <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>
              Expand Trip View
            </Link>
            {renderDeleteButton()}
          </div>
        </section>
      </div>
      : ""
    }
    </>
  );
};
