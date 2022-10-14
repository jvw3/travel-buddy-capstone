import { useNavigate, useParams } from "react-router-dom";
import { Title, Card, TextInput, Button, Center} from "@mantine/core"
import { useState, useEffect } from "react";

export const EditItinerary = ({}) => {
  //usertripId = userItinerary.itineraryId
  const { usertripId } = useParams();
  const [itineraries, setItineraries] = useState([]);
  const [userItineraries, setUserItineraries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [itineraryLocations, setItineraryLocations] = useState([]);

  const navigate = useNavigate();

  //data for the itinerary PUT request
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
  //data for the itinerarylocation
  const [itineraryLocation, updateItineraryLocation] = useState({
    itineraryId: 0,
    locationId: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8099/ItineraryLocations`)
      .then((res) => res.json())
      .then((itineraryLocationsArray) => {
        setItineraryLocations(itineraryLocationsArray);
      });
  }, []);

  const tripId = parseInt(`${usertripId}`);

  const foundLocation = itineraryLocations.find(
    (itineraryLoc) => itineraryLoc?.itineraryId === tripId
  );
  console.log(foundLocation?.id);

  // This useEffect hook fetches the specific itinerary That we want to edit.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraries/${usertripId}`)
      .then((res) => res.json())
      .then((myItinerary) => {
        update(myItinerary);
      });
  }, [usertripId]);

  // This useEffect hook fetches the specific itinerary Location that we want to edit.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraryLocations?itineraryId=${usertripId}`)
      .then((res) => res.json())
      .then((myItinerary) => {
        const itineraryToEdit = myItinerary[0];
        updateItineraryLocation(itineraryToEdit);
      });
  }, [usertripId]);

  //This useEffect hook fetches the locations for the dropdown.
  useEffect(() => {
    fetch(`http://localhost:8099/locations`)
      .then((res) => res.json())
      .then((locationsArray) => {
        setLocations(locationsArray);
      });
  }, []);

  // This useEffect hook fetches the itinerariesData from the API
  useEffect(() => {
    fetch(`http://localhost:8099/itineraries`)
      .then((res) => res.json())
      .then((itinerariesArray) => {
        setItineraries(itinerariesArray);
      });
  }, []);
  // This useEffect hook fetches the userItinerariesData from the API
  useEffect(() => {
    fetch(`http://localhost:8099/userItineraries`)
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  }, []);

  // How to find the right location to update?
  // We can itierate through Itinerary Locations, and if itineraryLocation.id === itineraryId, we have the right location.

  const updateTravelLocation = (event) => {
    return fetch(
      `http://localhost:8099/itineraryLocations/${foundLocation.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryLocation),
      }
    )
      .then((res) => res.json())
      .then(() => {
        navigate(-1);
      });
  };

  // This Button handles the PUT request for the Itinerary.
  const itineraryPutRequest = (event) => {
    event.preventDefault();

    return (
      fetch(`http://localhost:8099/itineraries/${itinerary?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itinerary),
      })
        .then((res) => res.json())
        //After Put request has been sent to API, and javascript has been parsed into JSON, the user will receive a feedback string.
        .then(() => {
          updateTravelLocation();
        })
    );
  };

  // const buttonGroup = (clickEvent) => {
  //   PostItinerary(clickEvent)
  //   updateTravelLocation(clickEvent);
  // };

  const UpdateItineraryButton = () => {
    return (
      <Center>
      <Button
      color="violet"
      size="lg"
        onClick={(clickEvent) => itineraryPutRequest(clickEvent)}
        className="btn btn-primary"
      >
        Save Changes
      </Button>
      </Center>
    );
  };

  // This function creates the JSX that will render the rental car portion of the form.
  const displayRentalCarInfo = () => {
    return (
      <> 
      <div className="flightformbox">
      <Center>
            <Title className="formtitle" order={2}>Rental Car Information</Title>
            </Center>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Reservation Time:</label>
            <input
              className="regularformstyle"
              required
              autoFocus
              type="datetime-local"
              value={itinerary?.rentalCarInfo?.reservationTime}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.rentalCarInfo.reservationTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Drop off Time:</label>
            <input
              required
              className="regularformstyle"
              autoFocus
              type="datetime-local"
              value={itinerary?.rentalCarInfo?.carDropOffTime}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.rentalCarInfo.carDropOffTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Rental Company:</label>
            <input
              required
              className="regularformstyle"
              autoFocus
              type="text"
              value={itinerary?.rentalCarInfo?.rentalCompany}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.rentalCarInfo.rentalCompany = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Rental reservation Number:</label>
            <input
              required
              className="regularformstyle"
              autoFocus
              type="number"
              value={itinerary?.rentalCarInfo?.reservationNum}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.rentalCarInfo.reservationNum = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        </div>
      </>
    );
  };
  // This function creates the JSX that will render the flight portion of the form.
  const displayFlightInfo = () => {
    return (
      <>
      <div className="flightformbox">
      <Center>
            <Title className="formtitle" order={2}>Flight Information</Title>
            </Center>
        <fieldset>
            <TextInput
              label="Departing Airline"
              required
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.departingAirline}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.departingAirline = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        <fieldset>
            <TextInput
              label="Returning Airline"
              required
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.returningAirline}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.returningAirline = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        <fieldset>
            <TextInput
              label="Departing Airport"
              required
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.departingAirport}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.departingAirport = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        <fieldset>
            <TextInput
              required
              label="Return Airport"
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.returnAirport}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.returnAirport = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Departing Flight Time:</label>
            <input
              className="regularformstyle"
              required
              autoFocus
              type="datetime-local"
              value={itinerary?.flightInfo?.flightToDestinationTime}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.flightToDestinationTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Returning Flight Time:</label>
            <input
              className="regularformstyle"
              required
              autoFocus
              type="datetime-local"
              value={itinerary?.flightInfo?.returnFlightTime}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.returnFlightTime = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
            <TextInput
              label="Departing Flight Number"
              required
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.departFlightNum}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.departFlightNum = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        <fieldset>
            <TextInput
              label="Returning Flight Number"
              required
              autoFocus
              type="text"
              className="mantineinputfield"
              value={itinerary?.flightInfo?.returnFlightNum}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.flightInfo.returnFlightNum = evt.target.value;
                update(copy);
              }}
            />
        </fieldset>
        </div>
      </>
    );
  };
  // This function creates the JSX that will render the top portion of the form.
  const displayMainTripInfo = () => {
    return (
      <>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="name">Where are you traveling?</label>
            <select
              className="regularformstyle"
              value={itineraryLocation.locationId}
              onChange={(evt) => {
                const copy = { ...itineraryLocation };
                copy.locationId = parseInt(evt.target.value);
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
          <div className="forminputfield">
            <label className="formlabel" htmlFor="name">How are you traveling?</label>
            <select
              className="regularformstyle"
              value={itinerary?.itinerary?.travelMethod}
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
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Departure Date:</label>
            <input
              className="regularformstyle"
              required
              autoFocus
              type="date"
              value={itinerary?.departureDate}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.departureDate = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="forminputfield">
            <label className="formlabel" htmlFor="description">Return Date:</label>
            <input
              className="regularformstyle"
              required
              autoFocus
              type="date"
              value={itinerary?.returnDate}
              onChange={(evt) => {
                const copy = { ...itinerary };
                copy.returnDate = evt.target.value;
                update(copy);
              }}
            />
          </div>
        </fieldset>
      </>
    );
  };

  return (
    <main className="maincontainer">
      <form className="itineraryForm">
        <Title className="formtitle" order={1}>Edit Itinerary</Title>
        <Card className="fullformcard" shadow="xl" withBorder>
      {displayMainTripInfo()}
      {displayFlightInfo()}
      {displayRentalCarInfo()}
      {UpdateItineraryButton()}
      </Card>
    </form>
    </main>
  );
};
