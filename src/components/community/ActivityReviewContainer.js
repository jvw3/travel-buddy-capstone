
import { useState } from "react";
import { ActivityReviewsList } from "./ActivityReviews";
import { ActivityReviewSearch } from "./ActivityReviewSearch";

// The child components (ticketSearch and Tickets) will access state via props.
export const ActivityReviewContainer = () => {
  const [descriptionSearchTerms, setDescriptionSearchTerms] = useState("");
  const [reviewSearchTerms, setReviewSearchTerms] = useState("");
  

  // The ticketContainer parent component will return two childe components.
  return (
    <>
      <ActivityReviewSearch
        descriptionSetterFunction={setDescriptionSearchTerms}
        reviewSetterFunction={setReviewSearchTerms}
      />
      <ActivityReviewsList
        descriptionSearchTermState={descriptionSearchTerms}
        reviewSearchTermState={reviewSearchTerms}
      />
    </>
  );
};