//I need to get all the itineraries for a user.
import { useEffect, useState } from "react"
import { IndividualTrip } from "./Itinerary"
import { CurrentTrip } from "./CurrentTrip"

export const UserItineraries = () => {
const[userItineraries, setUserItineraries] = useState([])
const[allUsers, setAllUsers] = useState([])
const [tripStarted, setTripstarted]= useState([])

const localAppUser = localStorage.getItem("travelbuddy_user")
const appUserObject = JSON.parse(localAppUser)

useEffect(
        () => {
            fetch(`http://localhost:8099/users`)
            .then(res => res.json())
            .then(
                (userData) => {
                    setAllUsers(userData)
                }
            )
        }, []
    )


// this finds the currentUser
// If appUserObject.id === userItinerary.userId, then return all itineraries from that user.
const currentUser = allUsers.find(user => 
    {return user.id === appUserObject.id})

// This use Effect fetches all of the itineraries for a user.
    useEffect(
        () => {
            fetch(`http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${currentUser.id}`)
            .then(res => res.json())
            .then(
                (myItinerariesArray) => {
                    setUserItineraries(myItinerariesArray)
                    
                }
            )
        }, []
    )

    return <>
    <article>
        <h2>My Current Trip</h2>
        {
            userItineraries.map(itinerary => <CurrentTrip 
            key={`itinerary--${itinerary?.id}`}
            travelMethod={itinerary.itinerary.travelMethod}
            departureDate={itinerary.itinerary.departureDate}
            returnDate={itinerary.itinerary.returnDate}
            id={itinerary?.id}
            isCurrent={itinerary.itinerary.isCurrent}
            userItinerariesArray={userItineraries}
            userItineraryObject={itinerary}
            />)
        }

    </article>
    <article>
        <h2>My Trips</h2>
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
            />)

        }

    </article>
    <article>
        <h2>My Completed Trips</h2>
    </article>
    </>
}