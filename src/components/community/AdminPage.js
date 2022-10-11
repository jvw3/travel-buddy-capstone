import { useState, useEffect } from "react";
import { AdminActivityReview} from "./AdminActivityReview"
import "./community.css";


export const AdminHomePageView = ({
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
    const searchedReviewsByReview = itineraryActivities.filter((activity) => {
      return activity.review.description
        .toLowerCase()
        .includes(reviewSearchTermState.toLowerCase());
    });
    setFiltered(searchedReviewsByReview);
  }, [reviewSearchTermState]);

  return (
    <>
      { reviewSearchTermState === "" ? (
        <div class="reviewscontainer">
          {itineraryActivities.map((itineraryActivity) => (
            <AdminActivityReview
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
            <AdminActivityReview
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
