import { Card, Text, Badge, Button } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"
import { useFetch } from "../api/APImanager";

// This component is responsible for rendering each individual activity of the activity list page. 
// Props are being passed from the MyActivities Parent component.
export const MyActivity = ({description, address, review, isPublic, itineraryId, activity}) => {
  const navigate = useNavigate();

  return (
    <>
      {isPublic ? (
        <Card withBorder>
          <Badge color="violet">{activity}</Badge>
          <Badge color="violet" variant="outline">
            Public
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
      ) : (
        <Card withBorder>
          <Badge color="violet">{activity}</Badge>
          <Badge color="violet" variant="outline">
            Private
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
      )}
    </>
  );
}

