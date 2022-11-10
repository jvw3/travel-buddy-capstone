import { Card, Text, Badge, Button } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"
import { useFetch } from "../api/APImanager";

// This component is responsible for rendering each individual activity of the activity list page.
// Props are being passed from the MyActivities Parent component.
export const MyFavoriteActivity = ({itineraryActivityObject, description, address, review, isPublic, itineraryId, isFavorited}) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // This useEffect hook is fetching the full array of activities from the API.
  // useEffect(() => {
  //   fetch(`http://localhost:8099/activities`)
  //     .then((res) => res.json())
  //     .then((activitiesArray) => {
  //       setActivities(activitiesArray);
  //     });
  // }, []);

  useFetch("http://localhost:8099/activities/",setActivities )

  //
  const foundActivity = activities.find((activity) => {
    return activity.id === itineraryActivityObject.activityId;
  });

// This function will return a ternary statement that will determine if the Badge will display Public or Private.
const publicOrPrivate = () => {
  return <>
  {
    isPublic
    ?  <Badge color="violet" variant="outline">
            Public
          </Badge>
    : <Badge color="violet" variant="outline">
            Private
          </Badge>
  }
  </>
}

  return (
    <>
      {isFavorited
      ? (
        <Card withBorder>
          <Badge color="violet">{foundActivity?.name}</Badge>
          {publicOrPrivate()}
          <Badge color="yellow" variant="outline">
            Favorite
          </Badge>
          <Text>Description: {description}</Text>
          <Text>Address: {address}</Text>
          <Text>Review: {review}</Text>
          <Button
            color="violet"
            onClick={() => {
              navigate(`/trips/${itineraryId}/view`);
            }}
          >
            View itinerary
          </Button>
        </Card>
      ) : ( ""
      )}
    </>
  )
        }