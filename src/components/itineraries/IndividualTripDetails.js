import { useParams } from "react-router-dom"
import { useEffect, useState} from "react"
import { Link } from "react-router-dom"


export const IndividualTripDetails = ({}) => {
    const {usertripId} = useParams()

    const[userItinerary, updateUserItinerary] = useState()
    const[destination, updateDestination] = useState()

// This useEffect hook fetches the specific itinerary for the current user. 
    useEffect(
        () => {
            fetch(`http://localhost:8099/userItineraries?_expand=itinerary&itineraryId=${usertripId}`)
            .then((res) => res.json())
            .then((trip) => {
                    const individualTrip = trip[0]
                    updateUserItinerary(individualTrip)
            })
        }, [usertripId]
    )
// This useEffect hook fetches the specific trip location for the current user's itinerary. 
    useEffect(
        () => {
            fetch(`http://localhost:8099/itineraryLocations?_expand=location&itineraryId=${usertripId}`)
            .then((res) => res.json())
            .then((destination) => {
                    const myDestination = destination[0]
                    updateDestination(myDestination)
            })
        }, [usertripId]
    )

    // const deleteButton = () => {
    // return <button onClick={() => {
    //     fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
    //         method: "DELETE"
    //     })
    //     .then(getAllTickets)
    // }}className="ticket_finish">Delete Trip</button>
    // }
    

    return <section className="full-trip-view">
        <div>
        <h2>Traveling to {destination?.location?.city}, {destination?.location?.state}</h2>
        <Link to={`/trips/${userItinerary?.itineraryId}/editItinerary`}>Edit your Itinerary</Link>
        <button>Delete Trip</button>
        </div>
        <h3>Leaving on: {userItinerary?.itinerary?.departureDate}</h3>
        <h3>Returning on: {userItinerary?.itinerary?.returnDate}</h3>

        <div>How are you traveling?: {userItinerary?.itinerary?.travelMethod} </div>
        <div>Flight to {destination?.location?.city}: {userItinerary?.itinerary?.flightInfo?.flightToDestinationTime}</div>
        <div>Return Flight: {userItinerary?.itinerary?.flightInfo?.returnFlightTime}</div>
    </section>
}