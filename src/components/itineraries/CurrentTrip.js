import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
          fetch(`http://localhost:8099/itineraries/${itineraryId}`, {
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

    const completeTripOnClick = () => {
      return (
        <button
          onClick={(event) => {
            completeTripstatusPut(event);
          }}
          className="finishtripbutton"
        >
          Finish Trip
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

  return (
    <>
      {isCurrent ? (
          <section className="currenttrip">
            <div className={foundLocation?.location.city + "pic"}>
              <div className="currenttripoverlay">
            <div>Departing on: {departureDate}</div>
            <div>Returning on: {returnDate}</div>
            {completeTripOnClick()}
            <div className="buttonsandlinks">
              <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>
                Expand Trip View
              </Link>
              {renderDeleteButton()}
              </div>
        </div>
            </div>
          </section>
      ) : (
        ""
      )}
    </>
  );
};
