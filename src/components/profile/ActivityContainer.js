import { ActivitySearch } from "./ActivitySearch"
import { Profile } from "./Profile";
import { useState } from "react";
import { MyActivities } from "./MyActivities";



export const ActivityContainer = () => {
const [searchTerms, setActivitySearchTerms] = useState("");

  // The ticketContainer parent component will return two childe components.
  return (
    <>
    <ActivitySearch setterFunction={setActivitySearchTerms} />
    <MyActivities searchTermState={searchTerms} />
    </>
  );
};