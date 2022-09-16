import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./itinerary.css"


// This component is used to display an Individual Trip view on the page. 
export const IndividualTrip = ({ travelMethod, departureDate, returnDate, isCurrent, userItineraries, userItineraryObject}) => {


    // iterate through itineraries, and the find the itinerary.Id that matches the itineraryId on the userItineraryObject.
const [itineraries, setItineraries]= useState([])
const [tripStarted, setTripstarted]= useState([])


// useEffect fetches all the itineraries from the database. 
    useEffect(
        () => {
            fetch(`http://localhost:8099/itineraries`)
            .then(res => res.json())
            .then(
                (itinerariesArray) => {
                    setItineraries(itinerariesArray)
                }
            )
        }, []
    )

// finds itinerary an itineraryId so that the delete request can target the right itinerary to delete.
    const foundItinerary = itineraries.find(itinerary => itinerary.id === userItineraryObject.itineraryId)

// This function renders the delete button and when clicked, will delete an itinerary.
const renderDeleteButton = () => {
    return <button onClick={() => {
        fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
            method: "DELETE"
        })
        .then(() => {
            // deleteUserItinerary()
            }
        )
    }}className="ticket_finish">Delete Trip</button>
    }


    // const setToCurrentTrip = () => {
    //     userItineraryObject.itinerary.isCurrent = true
    // }

    // const moveToCurrentTrip = () => {
    //     if (isCurrent) {

    //     }
    // }

    const displayCurrentTrip = () => {
        let foundTrip = userItineraries.find(itinerary => itinerary.itinerary.isCurrent === true)

        return <section>
            <div>{foundTrip.itinerary.travelMethod}</div>
        </section>
    }


    const startTrip = () => {
        return <button onClick={() => {    

        }}>Start Trip</button>
    }

    return <> 
    <div>
    </div>
    <div className="mytrips-container">
    <section className="itinerary" >
                        <div>{travelMethod}</div>
                        <div>Departing on: {departureDate}</div>
                        <div>Returning on: {returnDate}</div>
                        <div className="buttonsandlinks">
                        <button>Start Trip</button>
                        <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>Expand Trip View</Link>
                        {renderDeleteButton()}
                        </div>
                    </section>
                    </div>
                    </>
}