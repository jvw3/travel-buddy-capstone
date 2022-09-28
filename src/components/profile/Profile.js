import { useEffect, useState } from "react"
import { Card, Text, Button, Tabs, Badge} from "@mantine/core"
import { IconPlaneInflight, IconChecks, IconPlaneDeparture, IconStar} from "@tabler/icons"

export const Profile = () => {

    const[user, setUser] = useState({})

    const localAppUser = localStorage.getItem("travelbuddy_user");
    const appUserObject = JSON.parse(localAppUser);


      useEffect(() => {
        fetch(`http://localhost:8099/users/${appUserObject.id}`)
          .then((res) => res.json())
          .then((currentUserInfo) => {
            setUser(currentUserInfo);
          });
      }, []);

    console.log(user)


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
          <Tabs variant="pills" color="violet" defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab
                rightSection={<Badge></Badge>}
                value="gallery"
                icon={<IconPlaneInflight size={14} />}
              >
                All Activities
              </Tabs.Tab>
              <Tabs.Tab
                rightSection={<Badge></Badge>}
                value="messages"
                icon={<IconStar size={14} />}
              >
                Favorite Activities
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Card>
      </>
    );
}