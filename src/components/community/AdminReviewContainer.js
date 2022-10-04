
import { useState } from "react";
import { ActivityReviewsList } from "./ActivityReviews";
import { AdminReviewSearch} from "./AdminSearch";
import { Title } from "@mantine/core";
import { AdminHomePageView } from "./AdminPage";

// The child components (ticketSearch and Tickets) will access state via props.
export const AdminReviewContainer = () => {
const [reviewSearchTerms, setReviewSearchTerms] = useState("");

  // The ticketContainer parent component will return two childe components.
return (
    <>
      <Title>Reviews</Title>
      <AdminReviewSearch
        reviewSetterFunction={setReviewSearchTerms}
      />
      <AdminHomePageView
        reviewSearchTermState={reviewSearchTerms}
      />
    </>
  );
};