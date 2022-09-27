import { useState, useEffect } from "react";
import { ActivityReview } from "./ActivityReview"

export const ActivityReviewsList = () => {
  const [itineraryActivities, setItineraryActivities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities?_expand=activity`)
      .then((res) => res.json())
      .then((itineraryActivitiesArray) => {
        setItineraryActivities(itineraryActivitiesArray);
      });
  }, []);

// How to find the user who posted the review.


  return (
    <>
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
    </>
  );
};
