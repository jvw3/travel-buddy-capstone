import { Badge, Card, Text} from "@mantine/core"

// This component is responsible for rendering the individual review.
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
    return (
      <>
        {isPublic ? (
          <Card shadow="xl" className="individualreview" withBorder>
            <Card.Section className="reviewheader" withBorder p="sm">
              <div>
              <Badge color="violet">{activity}</Badge>
              </div>
              <div>
              <Badge>{activityAddress}</Badge>
              </div>
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