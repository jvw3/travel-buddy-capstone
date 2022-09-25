import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./itineraryform.css";

// I need to make 3 post requests when I make this form
// 1st Post request is creating the itinerary.
// 2nd Post request is creating the user Itinerary object (bridge table data).
// 3rd Post request is creating the itinerary Location object (bridge table data).
// For the 2nd and 3rd post requests, I need the itineraryId from the first post request.

export const ItineraryForm = () => {
  const [itinerary, update] = useState({
    travelMethod: "",
    departureDate: "",
    returnDate: "",
    flightToDestinationTime: "",
    returnFlight: "",
    departingAirport: "",
    departingFlightNumber: "",
    returningFlightNumber: "",
    returnAirport: "",
    departingAirline: "",
    returningAirline: "",
    reservationTime: "",
    carDropOffTime: "",
    rentalCompany: "",
    reservationNum: "",
    accessCode: 0,
  });

  const [itineraryLocation, updateItineraryLocation] = useState({
    locationId: 0,
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8099/locations`)
      .then((res) => res.json())
      .then((locationsArray) => {
        setLocations(locationsArray);
      });
  }, []);

  const navigate = useNavigate();
  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  const postUserItinerary = (itineraryId) => {
    const userItineraryToApi = {
      userId: appUserObject.id,
      itineraryId: itineraryId,
    };
    return fetch(`http://localhost:8099/userItineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userItineraryToApi),
    })
      .then((res) => res.json())
      .then(() => {});
  };

  const postItineraryLocation = (itineraryId) => {
    const itineraryLocationToApi = {
      itineraryId: itineraryId,
      locationId: parseInt(itineraryLocation.locationId),
    };
    return fetch(`http://localhost:8099/itineraryLocations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryLocationToApi),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/trips");
      });
  };
  // This function creates a new itinerary.
  const createItinerary = (event) => {
    event.preventDefault();

    const generateAccesscode = () => {
      return Math.floor(Math.random() * 100000) + 10000;
    };

    let code = generateAccesscode();

    const itineraryToApi = {
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
      isComplete: false,
      isCurrent: false,
      accessCode: code,
    };

    return fetch(`http://localhost:8099/itineraries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryToApi),
    })
      .then((res) => res.json())
      .then((itineraryObject) => {
        postUserItinerary(itineraryObject.id);
        postItineraryLocation(itineraryObject.id);
      });
  };

  // This function creates the JSX that will render form fields for rental car information.
  const displayRentalCarInfo = () => {
    return (
      <>
        <h3>Rental Car Info:</h3>
        <fieldset>
          <div className="row mb-3">
            <label htmlFor="description">Reservation Time:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={itinerary.reservationTime}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.reservationTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Drop off Time:</label>
            <input
              type="datetime-local"
              className="form-control"
              value={itinerary.carDropOffTime}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.carDropOffTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Rental Company:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.rentalCompany}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.rentalCompany = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Rental reservation Number:</label>
            <input
              type="number"
              className="form-control"
              value={itinerary.reservationNum}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.reservationNum = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
      </>
    );
  };
  // This function creates the JSX that will render the form fields for flight information.
  const displayFlightInfo = () => {
    return (
      <>
        <h3>Flight info:</h3>
        <fieldset>
          <div className="form_departingairline">
            <label htmlFor="description">Departing Airline:</label>
            <input
              type="text"
              className="form-control-departingAirline"
              value={itinerary.departingAirline}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.departingAirline = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Returning Airline:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.returningAirline}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.returningAirline = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Departing Airport:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.departingAirport}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.departingAirport = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Return Airport:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.returnAirport}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.returnAirport = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Departing Flight Time:</label>
            <input
              type="time"
              className="form-control"
              value={itinerary.flightToDestinationTime}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightToDestinationTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Returning Flight Time:</label>
            <input
              type="time"
              className="form-control"
              value={itinerary.returnFlight}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.returnFlight = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Returning Flight Number:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.returningFlightNumber}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.returningFlightNumber = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Departing Flight Number:</label>
            <input
              type="text"
              className="form-control"
              value={itinerary.departingFlightNumber}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.departingFlightNumber = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
      </>
    );
  };
  // This function creates the JSX that will render the top (first four) form fields of the itinerary form.
  const displayMainTripInfo = () => {
    return (
      <>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Where are you traveling?</label>
            <select
              className="form-control"
              value={itineraryLocation.locationId}
              required
              autoFocus
              onChange={(evt) => {
                const copy = { ...itineraryLocation };
                copy.locationId = evt.target.value;
                updateItineraryLocation(copy);
              }}
            >
              <option value="0">Choose your destination</option>
              {locations.map((location) => {
                return (
                  <option value={location.id} key={location.id}>
                    {location.city}, {location.state} {location.country}
                  </option>
                );
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">How are you traveling?</label>
            <select
              className="form-control"
              value={itinerary.travelMethod}
              required
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.travelMethod = evt.target.value;
                update(copy);
              }}
            >
              <option value="default">Choose Travel Method...</option>
              <option value="flight" name="flight">
                By Plane
              </option>
              <option value="car" name="car">
                By Car
              </option>
            </select>
          </div>
        </fieldset>
        <div className="depatureandarrival">
          <fieldset>
            <div className="departure">
              <label htmlFor="description">Departure Date:</label>
              <input
                className="form-control"
                type="date"
                value={itinerary.departureDate}
                required
                onChange={(evt) => {
                  const copy = { ...itinerary };
                  copy.departureDate = evt.target.value;
                  update(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="return">
              <label htmlFor="description">Return Date:</label>
              <input
                type="date"
                className="form-control"
                value={itinerary.returnDate}
                required
                onChange={(evt) => {
                  const copy = { ...itinerary };
                  copy.returnDate = evt.target.value;
                  update(copy);
                }}
              />
            </div>
          </fieldset>
        </div>
      </>
    );
  };

  return (
    <main className="maincontainer">
      <form className="itineraryForm">
        <h2 className="ticketForm__title">Create New Itinerary</h2>
        {displayMainTripInfo()}
        {displayFlightInfo()}
        {displayRentalCarInfo()}
        <button
          onClick={(clickEvent) => createItinerary(clickEvent)}
          className="btn btn-primary"
        >
          Create New Itinerary!
        </button>
      </form>
    </main>
  );
};
