import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Image, Text, Button, Badge } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

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
          <Card className="itineraryCard" shadow="xl" radius="md" p="sm" withBorder>
          <Image
            width={335}
            className="itineraryimage"
            src={foundLocation?.location?.tripsviewcitypic}
          />
          <Text size="xl">{foundLocation?.location.city}</Text>
          <Badge>Upcoming</Badge>
          <Card.Section>
            <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>
              Expand Trip View
            </Link>
            <div className="tripdates">
              <Text>Departing on: {departureDate}</Text>
              <Text>Returning on: {returnDate}</Text>
            </div>
          </Card.Section>
          <div className="buttonsandlinks">  
              {deleteTripOnClick()}
          </div>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};
