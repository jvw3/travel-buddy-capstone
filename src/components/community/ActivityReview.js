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
    reviewerName
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

 const renderFlagButton = () => {
    if (user.fullName !== reviewerName) {
        return (
          <Button
            color="red"
            onClick={() => {
              navigate(`/reviews/${id}/report`);
            }}
          >
            {" "}
            <IconFlag /> Report User
          </Button>
        );
    } else {
        return ""
    }
 }

    return <>
    {
        isPublic 
        ?  <Card className="individualreview" withBorder>
        <Badge color="violet">{activity}</Badge>
        <Text>{reviewerName}</Text>
        <Text>Description: {activityDescription}</Text>
        <Text>Address:{activityAddress}</Text>
        <Text>Review: {reviewDescription}</Text>
        {renderFlagButton()}
    </Card>
    : ""
    }
    
    
    </>

}