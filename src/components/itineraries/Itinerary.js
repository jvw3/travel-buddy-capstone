import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./itinerary.css"
import { IndividualTripDetails } from "./IndividualTripDetails"


// This component is used to display an Individual Trip view on the page. 
export const IndividualTrip = ({ travelMethod, departureDate, returnDate, isCurrent, userItineraries, userItineraryObject, getAllItineraries}) => {


    // iterate through itineraries, and the find the itinerary.Id that matches the itineraryId on the userItineraryObject.
const [itineraries, setItineraries]= useState([])
const [itineraryLocations, setItineraryLocations]= useState([])

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

// useEffect fetches all the itineraries from the database. 
useEffect(() => {
    fetch(`http://localhost:8099/itineraries`)
            .then(res => res.json())
            .then(
                (itinerariesArray) => {
                    setItineraries(itinerariesArray)
                })
        },[]
)

//This useEffect fetches all of the itinerary Locations, expanded by locationId. 
useEffect(() => {
    fetch(`http://localhost:8099/itineraryLocations?_expand=itinerary&_expand=location`)
            .then(res => res.json())
            .then(
                (itineraryLocationsArray) => {
                    setItineraryLocations(itineraryLocationsArray)
                })
        },[]
)

// This function will create the class that will display the image for your destination.
// map through itineraryLocations, and if itinerary Id matches the other itinerary Id, than display the 


//foundLocation is used to find the current location of the UseritineraryObject. This location will be used to render the matching city image.
    const foundLocation = itineraryLocations.find(location => 
        location.itineraryId === userItineraryObject.itineraryId
        )
// finds itinerary an itineraryId so that the delete request can target the right itinerary to delete.
    const foundItinerary = itineraries.find(itinerary => itinerary.id === userItineraryObject.itineraryId)

// This function renders the delete button and when clicked, will delete an itinerary.
const renderDeleteButton = () => {
    return <button onClick={() => {
        fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
            method: "DELETE"
        })
        .then(getAllItineraries)
    }}className="deletebutton">Delete Trip</button>
    }

//when start trip is clicked, a copy of the trip will displayed in
    const startTripOnClick = () => {
        return <button
        onClick={() => {    
        { const copy = {...itinerary}
            copy.isCurrent = true
            update(copy)}
        
    return fetch(`http://localhost:8088/itineraries/${foundItinerary.Id}}`, 
        {method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        // body: JSON.stringify(PutRequestForItinerary)
    })
        .then(res => res.json())

        }}className="startbutton"
        >Start Trip</button>
    }

    // const updateTripStatus = () => {
    //     return fetch(`http://localhost:8088/itineraries/${foundItinerary.Id}}`, 
    //     {method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }, 
    //     body: JSON.stringify(copy)
    // })
    //     .then(res => res.json())
    // }

    // On click, we're gonna PUT request the new isCurrent status to the API.
    // if isCurrent = true, 

    return <> 
    <div className="mytrips-container">
    <section className="itinerary" >
        <div className={foundLocation?.location.city + "pic"}></div>
                        <div>Departing on: {departureDate}</div>
                        <div>Returning on: {returnDate}</div>
                        <div className="buttonsandlinks">
                        {startTripOnClick()}
                        <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>Expand Trip View</Link>
                        {renderDeleteButton()}
                        </div>
                    </section>
                    </div>
                    <div>
                    </div>
                    </>
}