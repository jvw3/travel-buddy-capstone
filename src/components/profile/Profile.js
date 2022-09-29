import { useEffect, useState } from "react"
import { Card, Text, Button, Tabs, Badge} from "@mantine/core"
import { IconPlaneInflight, IconChecks, IconPlaneDeparture, IconStar} from "@tabler/icons"
import { MyActivity } from "./myActivity"

export const Profile = () => {

    const[user, setUser] = useState({})
    const[userItineraries, setUserItineraries] = useState([])
    const[itineraryActivities, setItineraryActivities] = useState([])

    const localAppUser = localStorage.getItem("travelbuddy_user");
    const appUserObject = JSON.parse(localAppUser);



      useEffect(() => {
        fetch(`http://localhost:8099/users/${appUserObject.id}`)
          .then((res) => res.json())
          .then((currentUserInfo) => {
            setUser(currentUserInfo);
          });
      }, []);

      useEffect(() => {
        fetch(`http://localhost:8099/itineraryActivities`)
          .then((res) => res.json())
          .then((activities) => {
            setItineraryActivities(activities);
          });
      }, []);

        useEffect(() => {
          fetch(`http://localhost:8099/userItineraries?userId=${appUserObject.id}`)
            .then((res) => res.json())
            .then((userItinerariesArray) => {
              setUserItineraries(userItinerariesArray);
            });
        }, []);
    
// iterate through itineraryActivities and iterate through user itineraries of current user, and if the itineraries match, then 



const displayUsersActivities = () => {
  const userActivities = []
userItineraries.forEach(itinerary => {
  itineraryActivities.forEach(activity => {
    if (activity.itineraryId === itinerary.itineraryId) {
      userActivities.push(activity)
    }
  })
})

return <>
{userActivities.map((activity) => (
              <MyActivity
                key={`itineraryActivity--${activity?.id}`}
                description={activity?.description}
                address={activity?.address}
                review={activity?.review?.description}
                id={activity?.id}
                activityId={activity?.activityId}
                isPublic={activity?.isPublic}
                itineraryId={activity?.itineraryId}
              />
            ))}
            </>
}
  
const displayUsersActivitiesCount = () => {
  const userActivities = [];
  userItineraries.forEach((itinerary) => {
    itineraryActivities.forEach((activity) => {
      if (activity.itineraryId === itinerary.itineraryId) {
        userActivities.push(activity);
      }
    });
  });

  return userActivities.length
};

    return (
      <>
        <Card withBorder>
          <Text>Name: {user.fullName}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Hometown: </Text>
          <Button color="violet" variant="light">
            Edit Profile
          </Button>
        </Card>
        <Card>
          <Tabs variant="pills" color="violet" defaultValue="all">
            <Tabs.List>
              <Tabs.Tab
                rightSection={<Badge color="violet">{displayUsersActivitiesCount()}</Badge>}
                value="all"
                icon={<IconPlaneInflight size={14} />}
              >
                All Activities
              </Tabs.Tab>
              <Tabs.Tab
                rightSection={<Badge></Badge>}
                value="favorites"
                icon={<IconStar size={14} />}
              >
                Favorite Activities
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="all" pt="xs">
              {displayUsersActivities()}
            </Tabs.Panel>

            <Tabs.Panel value="favorites" pt="xs">
              Messages tab content
            </Tabs.Panel>
          </Tabs>
        </Card>
      </>
    );
}