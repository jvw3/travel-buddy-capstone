//I need to get all the itineraries for a user.
import { useEffect, useState } from "react"
import { IndividualTrip } from "./Itinerary"
import { CurrentTrip } from "./CurrentTrip"
import { button } from "bootstrap"
import "./itinerary.css"






export const UserItineraries = () => {
const[userItineraries, setUserItineraries] = useState([])
const[activities, setActivities] = useState([])


const localAppUser = localStorage.getItem("travelbuddy_user")
const appUserObject = JSON.parse(localAppUser)

useEffect(
        () => {
            fetch(`http://localhost:8099/activities`)
            .then(res => res.json())
            .then(
                (activitiesData) => {
                    setActivities(activitiesData)
                }
            )
        }, []
    )

// This use Effect fetches all of the itineraries for a user.
    useEffect(
        () => {
            fetch(`http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject.id}`)
            .then(res => res.json())
            .then(
                (myItinerariesArray) => {
                    setUserItineraries(myItinerariesArray)
                }
            )
        }, []
    )

    // const renderDeleteButton = () => {
    // return <button onClick={() => {
    //     fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
    //         method: "DELETE"
    //     })
    //             .then(
    //         () => {
    //             getUpdatedItineraryListForUser()
    //         })
    //         .then( 
    //             (userItineraries) => setUserItineraries(userItineraries)
    //         )
    // }}className="deletebutton">Delete Trip</button>
    // }

    
// If isCurrent=true, display trip in CurrentTrip
// If isCurrent === false && isCompleted === false, display in Upcoming Trips
// If isCompleted === true, display trips in CompletedTrips
    return <>
    <article>
        <h2 className="mytripsheader">My Trips</h2>
        <div class="tripsContainer">
        {
            userItineraries.map(itinerary => <IndividualTrip  
            key={`itinerary--${itinerary?.id}`}
            travelMethod={itinerary.itinerary.travelMethod}
            departureDate={itinerary.itinerary.departureDate}
            returnDate={itinerary.itinerary.returnDate}
            id={itinerary?.id}
            isCurrent={itinerary.itinerary.isCurrent}
            userItineraries={userItineraries}
            userItineraryObject={itinerary}
            setUserItineraries={setUserItineraries}
            />)
        }
        </div>
    </article>
    </>
}