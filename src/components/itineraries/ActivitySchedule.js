import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ActivitySchedule = ({
  itineraryActivityObject,
  activity,
  activityDescription,
  activityAddress,
  activityDateTime,
  setItineraryActivities,
  id,
  itineraryId,
}) => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8099/itineraries`)
      .then((res) => res.json())
      .then((itinerariesArray) => {
        setItineraries(itinerariesArray);
      });
  }, []);

  const getItineraryActivitiesForUser = () => {
    fetch(
      `http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${foundItinerary.id}`
    )
      .then((res) => res.json())
      .then((userItineraryActivitiesArray) => {
        setItineraryActivities(userItineraryActivitiesArray);
      });
  };

  const foundItinerary = itineraries.find(
    (itinerary) => itinerary.id === itineraryActivityObject.itineraryId
  );

  // This function renders the delete button and when clicked, will delete an itinerary.
  const renderDeleteButton = () => {
    return (
      <button
        onClick={() => {
          fetch(
            `http://localhost:8099/itineraryActivities/${itineraryActivityObject?.id}`,
            {
              method: "DELETE",
            }
          ).then(() => {
            getItineraryActivitiesForUser();
          });
        }}
        className="deletebutton"
      >
        Delete Activity
      </button>
    );
  };

  return (
    <section class="scheduleitem">
      <div>{activity}</div>
      <div>{activityDescription}</div>
      <div>Where:{activityAddress}</div>
      <div>When: {activityDateTime}</div>
      {renderDeleteButton()}
      <Link to={`/trips/${id}/${itineraryId}/editActivity`}>Edit Activity</Link>
    </section>
  );
};
