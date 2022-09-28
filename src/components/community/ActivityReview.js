import { Card, Text } from "@mantine/core"

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



    return <>
    <Card withBorder>
        <Text>{reviewerName}</Text>
        <Text>{activity}</Text>
        <Text>Description: {activityDescription}</Text>
        <Text>Address:{activityAddress}</Text>
        <Text>Review: {reviewDescription}</Text>
    </Card>
    
    </>

}