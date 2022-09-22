import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./itinerary.css";
import { IndividualTripDetails } from "./IndividualTripDetails";

// This component is used to display an Individual Trip view on the page.
export const IndividualTrip = ({
  travelMethod,
  departureDate,
  returnDate,
  isCurrent,
  userItineraryObject,
  setUserItineraries,
  itineraryId,
  userItineraries
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
    fetch(
      `http://localhost:8099/userItineraries?_expand=itinerary&itineraryId=${itineraryId}`
    )
      .then((res) => res.json())
      .then((myItinerary) => {
        const itineraryToEdit = myItinerary[0];
        update(itineraryToEdit);
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
      <button
        onClick={() => {
          fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
            method: "DELETE",
          }).then(() => {
            getUpdatedItineraryListForUser();
          });
        }}
        className="deletebutton"
      >
        Delete Trip
      </button>
    );
  };

  //when start trip is clicked, a copy of the trip will displayed in
  const completeTripOnClick = () => {
    return (
      <button
        onClick={(event) => {
          completeTripstatusPut(event)
        }}
        className="startbutton"
      >
        Finish Trip
      </button>
    );
  };

  const completeTripstatusPut = (event) => {
    

   const itineraryPutToApi = {
     travelMethod: itinerary.travelMethod,
     flightInfo: {
       flightToDestinationTime: itinerary.flightToDestinationTime,
       returnFlightTime: itinerary.returnFlight,
       departingAirport: itinerary.departingAirport,
       returnAirport: itinerary.returnAirport,
       departingAirline: itinerary.departingAirline,
       returningAirline: itinerary.returningAirline,
       departFlightNum: itinerary.departingFlightNumber,
       returnFlightNum: itinerary.returningFlightNumber,
     },
     rentalCarInfo: {
       reservationTime: itinerary.reservationTime,
       carDropOffTime: itinerary.carDropOffTime,
       rentalCompany: itinerary.rentalCompany,
       reservationNum: itinerary.reservationNum,
     },
     departureDate: itinerary.departureDate,
     returnDate: itinerary.returnDate,
     isShared: false,
     isComplete: true,
     isCurrent: false,
   };

   return fetch(`http://localhost:8088/itineraries/${foundItinerary.Id}}`, {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(itineraryPutToApi),
   }).then((res) => res.json());
  }

  return (
    <>
      <div className="mytrips-container">
        <section className="itinerary">
          <div className={foundLocation?.location.city + "pic"}></div>
          <div>Departing on: {departureDate}</div>
          <div>Returning on: {returnDate}</div>
          <div className="buttonsandlinks">
            {completeTripOnClick()}
            <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>
              Expand Trip View
            </Link>
            {renderDeleteButton()}
          </div>
        </section>
      </div>
      <div></div>
    </>
  );
};
