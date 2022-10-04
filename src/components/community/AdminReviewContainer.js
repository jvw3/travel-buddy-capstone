
import { useState } from "react";
import { useNavigate} from "react-router-dom"
import { AdminReviewSearch} from "./AdminSearch";
import { Title, Button } from "@mantine/core";
import { AdminHomePageView } from "./AdminPage";

// The child components (ticketSearch and Tickets) will access state via props.
export const AdminReviewContainer = () => {
const [reviewSearchTerms, setReviewSearchTerms] = useState("");
const navigate = useNavigate()

  // The ticketContainer parent component will return two childe components.
return (
  <>
    <Title>Reviews</Title>
    <Button
    color="violet"
      onClick={() => {
        navigate("/allusers");
      }}
    >View Users</Button>
    <AdminReviewSearch reviewSetterFunction={setReviewSearchTerms} />
    <AdminHomePageView reviewSearchTermState={reviewSearchTerms} />
  </>
);
};