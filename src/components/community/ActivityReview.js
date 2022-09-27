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
        <Text>{activityDescription}</Text>
        <Text>{activityAddress}</Text>
        <Text>{reviewDescription}</Text>
    </Card>
    
    </>

}