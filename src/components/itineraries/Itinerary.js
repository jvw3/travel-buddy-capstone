import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./itinerary.css";
import { Card, Image, Text, Button, Badge } from "@mantine/core";
import { IndividualTripDetails } from "./IndividualTripDetails";
import { Snackbar } from "@mui/material";

// This component is used to display an Individual Trip view on the page.
export const IndividualTrip = ({
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

  // This function renders the delete button and when clicked, will delete an itinerary.
  const renderDeleteButton = () => {
    return (
      <Button
        color="red"
        onClick={() => {
          if (window.confirm("Press OK to confirm your delete.")) {
            fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
              method: "DELETE",
            })
              .then(() => {
                getUpdatedItineraryListForUser();
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

  //when start trip is clicked, a copy of the trip will displayed in
  const completeTripOnClick = () => {
    return (
      <Button
        onClick={(event) => {
          completeTripstatusPut(event);
        }}
      >
        Finish Trip
      </Button>
    );
  };

  const startTripOnClick = () => {
    return (
      <Button
        color="green"
        onClick={(event) => {
          startTripStatusPut(event);
        }}
      >
        Start Trip
      </Button>
    );
  };

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

  return (
    <>
      {isCurrent || isComplete ? (
        ""
      ) : (
        <Card shadow="md" radius="md" withBorder>
          <div className={foundLocation?.location.city + "pic"}></div>
          <Text size="xl">{foundLocation?.location.city}</Text>
          <Badge>Upcoming</Badge>
          <Link
            className="fulltripview"
            to={`/trips/${userItineraryObject.itineraryId}/view`}
          >
            Expand Trip View
          </Link>
          <div className="tripdates">
            <div className="carddepature">Departing on: {departureDate}</div>
            <div className="cardreturn">Returning on: {returnDate}</div>
          </div>
          <div className="buttonsandlinks">
            {startTripOnClick()}
            {completeTripOnClick()}
            {renderDeleteButton()}
          </div>
        </Card>
      )}
    </>
  );
};
