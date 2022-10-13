import { Badge, Card, Text, Button } from "@mantine/core"
import { IconFlag} from "@tabler/icons"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const ActivityReview = ({
    id,
    activity,
    activityDescription,
    activityAddress,
    activityDateTime,
    isPublic,
    itineraryActivityObject,
    reviewDescription,
    reviewerName,
    displayReviewerName
}) => {
const [user, setUser] = useState({})
 const navigate = useNavigate()
 
    const localAppUser = localStorage.getItem("travelbuddy_user");
 const appUserObject = JSON.parse(localAppUser);


 useEffect(() => {
   fetch(`http://localhost:8099/users/${appUserObject.id}`)
     .then((res) => res.json())
     .then((currentUserInfo) => {
       setUser(currentUserInfo);
     });
 }, []);




    return (
      <>
        {isPublic ? (
          <Card className="individualreview" withBorder>
            <Card.Section className="reviewheader" withBorder p="sm">
              <Badge color="violet">{activity}</Badge>
              <Badge>{activityAddress}</Badge>
            </Card.Section>
            <Text weight="bold">{reviewerName}</Text>
            <Text>Description: {activityDescription}</Text>
            <Text>Review: {reviewDescription}</Text>
          </Card>
        ) : (
          ""
        )}
      </>
    );

}