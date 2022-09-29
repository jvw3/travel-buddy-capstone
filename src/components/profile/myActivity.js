
import { Card, Text, Badge, Button } from "@mantine/core"
import { useNavigate } from "react-router-dom";


export const MyActivity = ({description, address, review, isPublic, itineraryId}) => {

const navigate = useNavigate()

    return (
      <>
        {isPublic ? (
          <Card withBorder>
            <Badge color="violet">Public</Badge>
            <Text>{description}</Text>
            <Text>{address}</Text>
            <Text>{review}</Text>
            <Button
            color="violet"
              onClick={() => {
                navigate(`/trips/${itineraryId}/view`);
              }}
            >View itinerary</Button>
          </Card>
        ) : (
          <Card withBorder>
            <Text>{description}</Text>
            <Text>{address}</Text>
            <Text>{review}</Text>
          </Card>
        )}
      </>
    );
}

