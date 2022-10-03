import { useState, useEffect } from "react";
import { ActivityReview } from "./ActivityReview";
import "./community.css";

export const ActivityReviewsList = ({
  descriptionSearchTermState,
  reviewSearchTermState,
}) => {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities?_expand=activity`)
      .then((res) => res.json())
      .then((itineraryActivitiesArray) => {
        setItineraryActivities(itineraryActivitiesArray);
      });
  }, []);

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


  return (
    <>
      {descriptionSearchTermState === "" && reviewSearchTermState === "" 
      ? (
        <div class="reviewscontainer">
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
        <div class="reviewscontainer">
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
