import { Card, Text, Badge, Button } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"

// This component is responsible for rendering each individual activity of the activity list page.
// Props are being passed from the MyActivities Parent component.
export const MyFavoriteActivity = ({itineraryActivityObject, description, address, review, isPublic, itineraryId, isFavorited}) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  // This useEffect hook is fetching the full array of activities from the API.
  useEffect(() => {
    fetch(`http://localhost:8099/activities/`)
      .then((res) => res.json())
      .then((activitiesArray) => {
        setActivities(activitiesArray);
      });
  }, []);

  //
  const foundActivity = activities.find((activity) => {
    return activity.id === itineraryActivityObject.activityId;
  });

  //TODO Make post request to API to change isPublic property from true to false

  //TODO Make post request to API to change isPublic property from false to true

  //TODO Make post request to API to change isFavorited property from false to true

  //TODO Make post request to API to change isFavorited property from true to false

  return (
    <>
      {isFavorited
      ? (
        <Card withBorder>
          <Badge color="violet">{foundActivity?.name}</Badge>
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