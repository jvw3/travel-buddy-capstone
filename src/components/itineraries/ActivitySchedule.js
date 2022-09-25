import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Timeline, Text, Card } from "@mantine/core";
import "./schedule.css";

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

  const navigate = useNavigate();

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
      <Button
        color="red"
        onClick={() => {
          if (window.confirm("Press OK to confirm your delete.")) {
            fetch(
              `http://localhost:8099/itineraryActivities/${itineraryActivityObject?.id}`,
              {
                method: "DELETE",
              }
            ).then(() => {
              getItineraryActivitiesForUser();
            });
          } else {
            return "";
          }
        }}
      >
        Delete Activity
      </Button>
    );
  };

  return (
    <>
      <Timeline.Item>
        <div className="timelineitem">
          <Text>{activity}</Text>
          <Text>{activityDescription}</Text>
          <div>Where:{activityAddress}</div>
          <div>When: {activityDateTime}</div>
          {renderDeleteButton()}
          <Button
            color="blue"
            onClick={() => {
              navigate(`/trips/${id}/${itineraryId}/editActivity`);
            }}
          >
            <Text size="sm">Edit Activity</Text>
          </Button>
          <Button
            color="green"
            onClick={() => {
              navigate(`/finishactivity/:${id}`);
            }}
          >
            Complete Activity
          </Button>
        </div>
      </Timeline.Item>
    </>
  );
};

{/* <Button
  radius="md"
  color="blue"
  onClick={() => {
    navigate(`/trips/${id}/${itineraryId}/editActivity`);
  }}
>
  <Text size="lg">Create New Trip</Text>
</Button>; */}

// to={`/trips/${id}/${itineraryId}/editActivity`}
