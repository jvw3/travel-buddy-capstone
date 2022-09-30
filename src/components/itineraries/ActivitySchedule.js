import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Timeline, Text, Card, Modal, Badge } from "@mantine/core";
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
  isComplete,
  review,
  isPublic
}) => {
 const[userFullName, setFullName] = useState ({})

  //
  const navigate = useNavigate();

   const [itineraryActivity, updateItineraryActivity] = useState({
     itineraryId: 0,
     activityId: 0,
     description: "",
     address: "",
     activityDateTime: "",
     review: {
       rating: 0,
       description: "",
     },
     isPublic: false,
     isComplete: false,
     reviewIdentity: ""
   });


    const localAppUser = localStorage.getItem("travelbuddy_user");
    const appUserObject = JSON.parse(localAppUser);
  
  useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject?.id}`)
      .then((res) => res.json())
      .then((currentUser) => {
        setFullName(currentUser);
      });
  }, []);



  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities/${id}`)
      .then((res) => res.json())
      .then((itineraryActivityToEdit) => {
        updateItineraryActivity(itineraryActivityToEdit);
      });
  }, []);

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

    const completeActivityOnClick = () => {
      return (
        <Button
          variant="light"
          onClick={(event) => {
            completeActivityStatusPut(event);
          }}
        >
          Complete Activity 
        </Button>
      );
    };

    const shareActivityOnClick = () => {
      return (
        <Button
          variant="light"
          color="violet"
          onClick={(event) => {
            shareActivityStatusPut(event);
          }}
        >
          Share Review
        </Button>
      );
    };

  const completeActivityStatusPut = (event) => {

    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description
      },
      isPublic: itineraryActivity.isPublic,
      isComplete: true,
      reviewIdentity: ""
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      });
  };

  const shareActivityStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: true,
      isComplete: itineraryActivity.isComplete,
      reviewIdentity: userFullName.fullName
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      });

  }

// Display different text depending on if the user has written any text for their review. 
  const displayReviewButtonText = () => {
    if (review === "") {
      return "Leave a review!"
    } else {
      return "Edit Review"
    }
  }

  return (
    <>
      {isComplete ? (
        <Timeline.Item>
          <div className="timelineitem">
            <Card withBorder shadow="md">
              <Badge color="green">Completed</Badge>
              <Text>{activity}</Text>
              <Text>{activityDescription}</Text>
              <div>Where:{activityAddress}</div>
              <div>When: {activityDateTime}</div>
              <Button
                color="violet"
                variant="light"
                onClick={() => {
                  navigate(`/trips/${id}/${itineraryId}/editActivity`);
                }}
              >
                <Text size="sm">Edit Activity</Text>
              </Button>
              <Button
                color="violet"
                onClick={() => {
                  navigate(`/trips/${id}/finishactivity`);
                }}
              >
                {displayReviewButtonText()}
              </Button>
              {shareActivityOnClick()}
                {renderDeleteButton()}
            </Card>
          </div>
        </Timeline.Item>
      ) : (
        <Timeline.Item>
          <div className="timelineitem">
          <Card withBorder shadow="md">
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
            {completeActivityOnClick()}
            </Card>
          </div>
        </Timeline.Item>
      )}
    </>
  );
};
