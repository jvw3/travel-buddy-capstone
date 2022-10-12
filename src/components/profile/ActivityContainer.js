import { ActivitySearch } from "./ActivitySearch"
import { Profile } from "./Profile";
import { useState } from "react";
import { MyActivities } from "./MyActivities";
import { Title} from "@mantine/core"


// This component is responsible for managing the state of the activity search bar. searchTerms and setActivitySearchTerms are passed as props to Activity Search and MyActivities.
export const ActivityContainer = () => {
const [searchTerms, setActivitySearchTerms] = useState("");

  // The ticketContainer parent component will return two childe components.
  return (
    <> 
    <Title className="activitytitle" order={1}>My Activities</Title>
    <ActivitySearch setterFunction={setActivitySearchTerms} />
    <MyActivities searchTermState={searchTerms} />
    </>
  );
};