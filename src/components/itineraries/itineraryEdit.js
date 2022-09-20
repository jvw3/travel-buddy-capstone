import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const EditItinerary = ({}) => {

// getting 
    const {usertripId} = useParams()

    const navigate = useNavigate()

    //data for the PUT request 
    const[itinerary, update] = useState({
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
    isComplete: false
    })

    const[itineraryLocation, updateItineraryLocation] = useState({
    locationId: 0
})

const [locations, setLocations] = useState([])

useEffect(
        () => {
            fetch(`http://localhost:8099/locations`)
            .then(res => res.json())
            .then((locationsArray) => {
                setLocations(locationsArray)
            })
        }, []
    )

    // This useEffect Hook will fetch the current trip for the user. update will use the element stored in myEditTrip, and  
    useEffect(() => {
        fetch(`http://localhost:8099/userItineraries?_expand=itinerary&itineraryId=${usertripId}`)
        .then((res) => res.json())
        .then(
            // TicketData will already be an object instead of an array so we don't need to get it at index 0.
            (myItinerary) => {
                const myEditTrip = myItinerary[0]
                update(myEditTrip)
            })
    },[usertripId]
    )


    const updateTravelLocation = () => {
        return fetch(`http://localhost:8099/itineraryLocations/${usertripId}}`, 
        {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(itinerary)
    })
        .then(res => res.json())
    }

    const UpdateItinearyButton = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8099/itineraries/${itinerary?.itinerary?.id}`, 
        {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(itinerary)
    })
        .then(res => res.json())
        //After Put request has been sent to API, and javascript has been parsed into JSON, the user will receive a feedback string. 
        .then(() => {
                navigate("/trips")
            })
    }

const displayRentalCarInfo = () => {
return <>
<fieldset>
                <div className="form-group">
                    <label htmlFor="description">Reservation Time:</label>
                    <input
                        required autoFocus
                        type="datetime-local"
                        className="form-control"
                        value={itinerary?.itinerary?.rentalCarInfo?.reservationTime}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.reservationTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Drop off Time:</label>
                    <input
                        required autoFocus
                        type="datetime-local"
                        className="form-control"
                        value={itinerary?.itinerary?.rentalCarInfo?.carDropOffTime}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.carDropOffTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Rental Company:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.rentalCarInfo?.rentalCompany}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.rentalCompany = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Rental reservation Number:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        value={itinerary?.itinerary?.rentalCarInfo?.reservationNum}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.reservationNum = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            </>
}

const displayFlightInfo = () => {
    return  <>
    <fieldset>
                <div className="form_departingairline">
                    <label htmlFor="description">Departing Airline:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control-departingAirline"
                        value={itinerary?.itinerary?.flightInfo?.departingAirline}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.departingAirline = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Returning Airline:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.returningAirline}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.returningAirline = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Departing Airport:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.departingAirport}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.departingAirport = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Return Airport:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.returnAirport}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.returnAirport = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Departing Flight Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.flightToDestinationTime}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.flightToDestinationTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Returning Flight Time:</label>
                    <input
                        required autoFocus
                        type="time"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.returnFlightTime}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.returnFlightTime = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset> 
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Returning Flight Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.returnFlightNum}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.returnFlightNum = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Departing Flight Number:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={itinerary?.itinerary?.flightInfo?.departFlightNum}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.flightInfo.departFlightNum = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
        </>
}

const displayMainTripInfo = () => {
    return <>
    <fieldset>
                <div className="form-group"> 
                    <label htmlFor="name">Where are you traveling?</label>
                    <select value={itineraryLocation.locationId}
                    onChange={ 
                            (evt) => {
                                const copy = {...itineraryLocation}
                                copy.locationId = evt.target.value
                                updateItineraryLocation(copy)
                            } 
                            }> 
                            <option value="0">Choose your destination</option>
                            {locations.map(location => {
                                return <option value={location.id} key={location.id}>{location.city}, {location.state} {location.country}</option>
                            })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">How are you traveling?</label>
                    <select value={itinerary?.itinerary?.travelMethod}
                    onChange={ 
                            (evt) => {
                                const copy = {...itinerary}
                                copy.travelMethod = evt.target.value
                                update(copy)
                            } 
                            }> 
                            <option value="default">Choose Travel Method...</option>
                            <option value="flight" name="flight">By Plane</option>
                            <option value="car" name="car">By Car</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Departure Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={itinerary?.itinerary?.departureDate}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.departureDate = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Return Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        value={itinerary?.itinerary?.returnDate}
                        onChange={
                            (evt) => {
                                const copy = {...itinerary}
                                copy.itinerary.returnDate = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
    </>
}

return (
        <form className="itineraryForm">
            <h2 className="ticketForm__title">Edit Your Itinerary:</h2>
            {displayMainTripInfo()}
            {displayFlightInfo()}
            {displayRentalCarInfo()}
            <button
                onClick={(clickEvent) => UpdateItinearyButton(clickEvent)}
            className="btn btn-primary">
                Save Changes
            </button>
        </form>
    )
}