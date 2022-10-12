import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Image, Text, Button, Badge, Menu, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";
import { IconDots } from "@tabler/icons";
import { IconTrash } from "@tabler/icons";

export const CompletedTrip = ({
  isComplete,
  departureDate,
  returnDate,
  userItineraryObject,
  itineraryId,
  setUserItineraries, 
}) => {
  const [itineraryLocations, setItineraryLocations] = useState([]);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `http://localhost:8099/itineraryLocations?_expand=itinerary&_expand=location`
    )
      .then((res) => res.json())
      .then((itineraryLocationsArray) => {
        setItineraryLocations(itineraryLocationsArray);
      });
  }, []);

  const foundLocation = itineraryLocations.find(
    (location) => location.itineraryId === userItineraryObject.itineraryId
  );

  const getUpdatedItineraryListForUser = () => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject.id}`
    )
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  };

    const deleteTripOnClick = () => {
      return (
        <Button
        fullWidth
          color="red"
          onClick={() => {
            deleteTripConfirmation();
          }}
        >
          Delete Trip
        </Button>
      );
    };

    const deleteTripConfirmation = () => {
      openConfirmModal({
        title: "Are you sure you want to delete your trip?",
        children: (
          <Text size="sm">Please click confirm or cancel to proceed.</Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: { color: 'red' },
        onCancel: () => "",
        onConfirm: () => deleteTripRequest(),
      });
    };

      const deleteTripRequest = () => {
        return fetch(`http://localhost:8099/itineraries/${itineraryId}`, {
          method: "DELETE",
        })
          .then(() => {
            getUpdatedItineraryListForUser();
          })
          .then(() => {
            showNotification({
              title: "Notification",
              message: "Your trip has been deleted.",
            });
          });
      };

  return (
    <>
      {isComplete ? (
        <Card
          className="itineraryCard"
          shadow="xl"
          radius="md"
          p="sm"
          withBorder
        >
          <Menu withinPortal position="right-start" withArrow shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconTrash size={14} />}
                onClick={() => {
                  deleteTripConfirmation();
                }}
                color="red"
              >
                Delete Trip
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Image
            fit="contain"
            height={275}
            className="itineraryimage"
            src={foundLocation?.location?.tripsviewcitypic}
          />
          <Badge color="violet" >Completed</Badge>
          <Badge size="xs">Departing on: {departureDate}</Badge>
          <Badge size="xs">Returning on: {returnDate}</Badge>
          <Text size="xl">{foundLocation?.location.city}</Text>
          <Card.Section>
            <div className="tripdates"></div>
          </Card.Section>
          <Button
            fullWidth
            color="violet"
            onClick={() => {
              navigate(`/trips/${userItineraryObject.itineraryId}/view`);
            }}
          >
            View Completed Trip Details
          </Button>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};
