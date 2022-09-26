import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Timeline, Text, Card, Modal } from "@mantine/core";
import "./activities.css";

// This component handles the creation of the activity schedule. Props are being passed from IndividualTripDetails component to this component, using deconstruction.
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
  // const [itineraries, setItineraries] = useState([]);

  //
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`http://localhost:8099/itineraries`)
  //     .then((res) => res.json())
  //     .then((itinerariesArray) => {
  //       setItineraries(itinerariesArray);
  //     });
  // }, []);

  const getItineraryActivitiesForUser = () => {
    fetch(
      `http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${itineraryId}`
    )
      .then((res) => res.json())
      .then((userItineraryActivitiesArray) => {
        setItineraryActivities(userItineraryActivitiesArray);
      });
  };

  // const foundItinerary = itineraries.find(
  //   (itinerary) => itinerary.id === itineraryActivityObject.itineraryId
  // );

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

  console.log(id)

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
          <Button>
            Complete Activity
          </Button>
          <Button
            color="green"
            onClick={() => {
              navigate(`/trips/${id}/finishactivity`);
            }}
          >
            Leave a Review!
          </Button>
        </div>
      </Timeline.Item>
    </>
  );
};
