import { ActivitySearch } from "./ActivitySearch"
import { Profile } from "./Profile";
import { useState } from "react";
import { MyActivities } from "./MyActivities";
import { Title} from "@mantine/core"



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