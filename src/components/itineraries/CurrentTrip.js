import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import "./itinerary.css"

export const CurrentTrip = ({ travelMethod, departureDate, returnDate, isCurrent, userItineraries, userItineraryObject}) => {


    // iterate through itineraries, and the find the itinerary.Id that matches the itineraryId on the userItineraryObject.
const [itineraries, setItineraries]= useState([])
const [tripStarted, setTripstarted]= useState([])



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

    useEffect(
        () => {
            if (tripStarted) {
                
            }
        }
    )

    const displayCurrentTrip = () => {
        return <section>
            <div>Im traveling right now</div>
        </section>
    }

    const foundItinerary = itineraries.find(itinerary => itinerary.id === userItineraryObject.itineraryId)

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


    const startButton = () => {
        return <button>
            onClick={() => {
                setTripstarted(true)
            }}
        </button>
    }

    return <>
    <div className="mytrips-container">
        {
            userItineraryObject.itinerary.isCurrent

            ?  <section className="itinerary" >
                        <div>{travelMethod}</div>
                        <div>Departing on: {departureDate}</div>
                        <div>Returning on: {returnDate}</div>
                        <div className="buttonsandlinks">
                        <button>Start Trip</button>
                        <Link to={`/trips/${userItineraryObject.itineraryId}/view`}>Expand Trip View</Link>
                        {renderDeleteButton()}
                        </div>
                    </section>
                    
                    : ""
                }
                </div>
    </>
}