import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Text, Card, Button, ActionIcon, Image, Badge} from "@mantine/core"
import { IconDots, IconCheck, IconTrash, } from "@tabler/icons"
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

export const CurrentTrip = ({
  isCurrent,
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

    const [itinerary, update] = useState({
      travelMethod: "",
      departureDate: "",
      returnDate: "",
      flightToDestinationTime: "",
      returnFlight: "",
      departingAirport: "",
      departFlightNum: "",
      returnFlightNum: "",
      returnAirport: "",
      departingAirline: "",
      returningAirline: "",
      reservationTime: "",
      carDropOffTime: "",
      rentalCompany: "",
      reservationNum: "",
      isShared: false,
      isCurrent: false,
      isComplete: false,
    });

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

    useEffect(() => {
      fetch(`http://localhost:8099/itineraries/${itineraryId}`)
        .then((res) => res.json())
        .then((myItinerary) => {
          update(myItinerary);
        });
    }, []);

  const renderDeleteButton = () => {
    return (
      <button
        onClick={() => {
          deleteTripConfirmation()
        }}
      >
        Delete Trip
      </button>
    );
  };


    const completeTripstatusPut = (event) => {
      const itineraryPutToApi = {
        travelMethod: itinerary.travelMethod,
        flightInfo: {
          flightToDestinationTime: itinerary.flightInfo.flightToDestinationTime,
          returnFlightTime: itinerary.flightInfo.returnFlightTime,
          departingAirport: itinerary.flightInfo.departingAirport,
          returnAirport: itinerary.flightInfo.returnAirport,
          departingAirline: itinerary.flightInfo.departingAirline,
          returningAirline: itinerary.flightInfo.returningAirline,
          departFlightNum: itinerary?.flightInfo?.departFlightNum,
          returnFlightNum: itinerary.flightInfo.returnFlightNum,
        },
        rentalCarInfo: {
          reservationTime: itinerary.rentalCarInfo.reservationTime,
          carDropOffTime: itinerary.rentalCarInfo.carDropOffTime,
          rentalCompany: itinerary.rentalCarInfo.rentalCompany,
          reservationNum: itinerary.rentalCarInfo.reservationNum,
        },
        departureDate: itinerary.departureDate,
        returnDate: itinerary.returnDate,
        isShared: false,
        isComplete: true,
        isCurrent: false,
        accessCode: itinerary.accessCode,
      };

      return fetch(`http://localhost:8099/itineraries/${itineraryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryPutToApi),
      })
        .then((res) => res.json())
        .then(() => {
          getUpdatedItineraryListForUser();
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

    //when complete trip button is clicked, CompleteTripStatusPut function runs which performs the following function: put request is made to the api to change isComplete from false to true.
    const completeTripOnClick = () => {
      return (
        <Button
          color="violet"
          onClick={() => {
            finishTripConfirmation();
          }}
        >
          Finish Trip
        </Button>
      );
    };

    //This function renders a popup confirmation from the user to finish their trip. This popup is from Mantine UI and it is called a Modal. When Finish trip button is clicked, Modal is rendered, and an action will be completed depending on user clicking confirm or cancel.
    const finishTripConfirmation = () =>
      openConfirmModal({
        title:
          "Are you sure you want to finish your trip?",
        children: (
          <Text size="sm">Please click confirm or cancel to proceed.</Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        onCancel: () => "",
        onConfirm: (event) => completeTripstatusPut(event),
      });

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

  return (
    <>
      {isCurrent ? (
        <Card
          className="currentitinerarycard"
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
          width={675}
            className="itineraryimage"
            src={foundLocation?.location?.tripsviewcitypic}
          />
          <Badge size="lg" color="violet">Current</Badge>
          <Badge size="lg" >Departing: {departureDate}</Badge>
          <Badge size="lg" >Returning: {returnDate}</Badge>
          <div className="citybadge">
            <Text size="xl">{foundLocation?.location.city}</Text>
            <div className="tripdates">
            </div>
          </div>
          <Card.Section withBorder p={7}>
            <div className="buttonsandlinks">
              {completeTripOnClick()}
              <Button
                color="violet"
                variant="light"
                onClick={() => {
                  navigate(`/trips/${userItineraryObject.itineraryId}/view`);
                }}
              >
                View Trip Details
              </Button>
            </div>
          </Card.Section>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};




