import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./itinerary.css";
import { Card, Image, Text, Button, Badge, Transition } from "@mantine/core";
import { IndividualTripDetails } from "./IndividualTripDetails";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

// This component is used to display an Individual Trip view on the page.
// Props are being passed from itinerary component.
export const Itinerary = ({
  travelMethod,
  departureDate,
  returnDate,
  isCurrent,
  isComplete,
  userItineraryObject,
  setUserItineraries,
  itineraryId,
  userItineraries,
}) => {
  // iterate through itineraries, and the find the itinerary.Id that matches the itineraryId on the userItineraryObject.
  const [itineraries, setItineraries] = useState([]);
  const [itineraryLocations, setItineraryLocations] = useState([]);

  const navigate = useNavigate();

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

  // useEffect fetches all the itineraries from the database.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraries`)
      .then((res) => res.json())
      .then((itinerariesArray) => {
        setItineraries(itinerariesArray);
      });
  }, []);

  //This useEffect fetches all of the itinerary Locations, expanded by locationId.
  useEffect(() => {
    fetch(
      `http://localhost:8099/itineraryLocations?_expand=itinerary&_expand=location`
    )
      .then((res) => res.json())
      .then((itineraryLocationsArray) => {
        setItineraryLocations(itineraryLocationsArray);
      });
  }, []);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  const getUpdatedItineraryListForUser = () => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject.id}`
    )
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  };

  // fetch the specific itinerary that we want to edit.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraries/${itineraryId}`)
      .then((res) => res.json())
      .then((myItinerary) => {
        update(myItinerary);
      });
  }, []);

  // This function will create the class that will display the image for your destination.
  // map through itineraryLocations, and if itinerary Id matches the other itinerary Id, than display the

  //foundLocation is used to find the current location of the UseritineraryObject. This location will be used to render the matching city image.
  const foundLocation = itineraryLocations.find(
    (location) => location.itineraryId === userItineraryObject.itineraryId
  );
  // finds itinerary an itineraryId so that the delete request can target the right itinerary to delete.
  const foundItinerary = itineraries.find(
    (itinerary) => itinerary.id === userItineraryObject.itineraryId
  );

  // This function renders the delete button and when clicked, will delete an itinerary. A fetch call will be made to get the updated List of itineraries, then a notification will be sent to the screen telling the user that their trip was deleted. 
  const renderDeleteButton = () => {
    return (
      <Button
        color="red"
        variant="light"
        onClick={() => {
          if (window.confirm("Press OK to confirm your delete.")) {
            fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
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
          } else {
            return "";
          }
        }}
      >
        Delete Trip
      </Button>
    );
  };

  //when complete trip button is clicked, CompleteTripStatusPut function runs which performs the following function: put request is made to the api to change isComplete from false to true.
  const completeTripOnClick = () => {
    return (
      <Button
        variant="light"
        onClick={() => {
          finishTripConfirmation()
        }}
      >
        Finish Trip
      </Button>
    );
  };

  //This function renders a popup confirmation from the user to finish their trip. This popup is from Mantine UI and it is called a Modal. When Finish trip button is clicked, Modal is rendered, and an action will be completed depending on user clicking confirm or cancel. 
  const finishTripConfirmation = () =>
    openConfirmModal({
      title: "Do you want to finish your trip?",
      children: (
        <Text size="sm">
          Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => "",
      onConfirm: (event) => completeTripstatusPut(event)
    });

  // When start trip button is clicked, CompleteTripStatusPut function runs which performs the following function: put request is made to the api to change isCurrent from false to true.
  const startTripOnClick = () => {
    return (
      <Button
        color="green"
        variant="light"
        onClick={(event) => {
          startTripStatusPut(event);
        }}
      >
        Start Trip
      </Button>
    );
  };

  // This function sends a put request to the API to change the value of the isCurrent property from false to true.
  const startTripStatusPut = (event) => {
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
      isComplete: false,
      isCurrent: true,
      accessCode: itinerary.accessCode,
    };
    return fetch(`http://localhost:8099/itineraries/${foundItinerary?.id}`, {
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

  // This function sends a put request to the API to change the value of the isComplete property from false to true.
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

    return fetch(`http://localhost:8099/itineraries/${foundItinerary?.id}`, {
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

  // In JSX below, ternary statement runs with the following condition: If isCurrent OR isComplete property of an itinerary is TRUE, an empty string will be returned. For all other conditoins, we will display the itinerary.
  return (
    <>
      {isCurrent || isComplete ? (
        ""
      ) : (
        <Card shadow="lg" radius="md" withBorder>
          <Image
            width={335}
            className=""
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
            <Button.Group>
              {startTripOnClick()}
              {completeTripOnClick()}
              {renderDeleteButton()}
            </Button.Group>
          </div>
        </Card>
      )}
    </>
  );
};
