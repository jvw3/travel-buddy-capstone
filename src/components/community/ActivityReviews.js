import { useState, useEffect } from "react";
import { useFetch } from "../api/APImanager";
import { ActivityReview } from "./ActivityReview";
import "./community.css";

// This component is responsible for rendering the full list of activity reviews.
export const ActivityReviewsList = ({
  descriptionSearchTermState,
  reviewSearchTermState,
}) => {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useFetch("http://localhost:8099/itineraryActivities?_expand=activity", setItineraryActivities)


  useEffect(() => {
    const searchedReviewsByDescription = itineraryActivities.filter(
      (activity) => {
        return activity.activity.name
          .toLowerCase()
          .includes(descriptionSearchTermState.toLowerCase());
      }
    );
    setFiltered(searchedReviewsByDescription);
  }, [descriptionSearchTermState]);

  useEffect(() => {
    const searchedReviewsByReview = itineraryActivities.filter((activity) => {
      return activity.review.description
        .toLowerCase()
        .includes(reviewSearchTermState.toLowerCase());
    });
    setFiltered(searchedReviewsByReview);
  }, [reviewSearchTermState]);

// How to find the user name for a itinerary Activity?
//Iterate through itineraryActivities and iterate through userItineraries and return the matching itineraryId.

  return (
    <>
      {descriptionSearchTermState === "" && reviewSearchTermState === ""
      ? (
        <div className="reviewscontainer">
          {itineraryActivities.map((itineraryActivity) => (
            <ActivityReview
              key={`itineraryactivity--${itineraryActivity?.id}`}
              id={itineraryActivity?.id}
              activity={itineraryActivity?.activity?.name}
              activityDescription={itineraryActivity?.description}
              activityAddress={itineraryActivity?.address}
              activityDateTime={itineraryActivity?.activityDateTime}
              isPublic={itineraryActivity?.isPublic}
              itineraryActivityObject={itineraryActivity}
              reviewDescription={itineraryActivity?.review?.description}
              reviewerName={itineraryActivity?.reviewIdentity}
            />
          ))}
        </div>
      ) : (
        <div className="reviewscontainer">
          {filtered.map((itineraryActivity) => (
            <ActivityReview
              key={`itineraryactivity--${itineraryActivity?.id}`}
              id={itineraryActivity?.id}
              activity={itineraryActivity?.activity?.name}
              activityDescription={itineraryActivity?.description}
              activityAddress={itineraryActivity?.address}
              activityDateTime={itineraryActivity?.activityDateTime}
              isPublic={itineraryActivity?.isPublic}
              itineraryActivityObject={itineraryActivity}
              reviewDescription={itineraryActivity?.review?.description}
              reviewerName={itineraryActivity?.reviewIdentity}
            />
          ))}
        </div>
      )}
    </>
  );
};
