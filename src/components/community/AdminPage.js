import { useState, useEffect } from "react";
import { useFetch } from "../api/APImanager";
import { AdminActivityReview} from "./AdminActivityReview"
import "./community.css";

// This component is responsible for rendering the admin home page.
export const AdminHomePageView = ({
  reviewSearchTermState,
}) => {
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);

// This useEffect hook fetches data from the API and setItineraryActivities function stores that data inside of itineraryActivities.

  useFetch("http://localhost:8099/itineraryActivities?_expand=activity", setItineraryActivities)

// This useEffect is responsible for observing state of reviewSearchTermState, and using setFiltered function to store data inside of filtered state variable, every time state changes.
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
        <div className="reviewscontainer">
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
        <div className="reviewscontainer">
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
