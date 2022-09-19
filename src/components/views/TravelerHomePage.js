import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./HomePage.css"
import { UserItineraries } from "../itineraries/MyTrips"
import { UpcomingTrip } from "./HomePageUpcomingTrips"


const localAppUser = localStorage.getItem("travelbuddy_user")
const appUserObject = JSON.parse(localAppUser)


export const HomePageView = () => {
const[userItineraries, setUserItineraries] = useState([])

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

    const displayedUpcomingTrips = userItineraries.slice(0,3)

    // console.log(displayedUpcomingTrips?.itinerary)

    console.log(displayedUpcomingTrips[0]?.itinerary?.travelMethod)
    

    // const tripOne = displayedUpcomingTrips[0]
    // const tripTwo = displayedUpcomingTrips[1]
    // const tripThree = displayedUpcomingTrips[2]

    // console.log(tripOne)
    // console.log(displayedUpcomingTrips)


    return <>
    <div className="topsection">
        <div>
        <h1>Travel Buddy</h1>
        <Link className="getStarted" to="/createnewtrip">Get started!</Link>
        </div>
        
        </div>
    <div className="bottomsection">
        <h2>Upcoming Trips</h2>
        <section className="upcomingtripcontainer">
            {
                displayedUpcomingTrips.map(trip => <UpcomingTrip  
            key={`itinerary--${trip?.id}`}
            tripObject={trip}
            departureDate={trip?.itinerary?.departureDate}
            returnDate={trip?.itinerary?.returnDate}
            id={trip?.id}
            userItineraries={userItineraries}
            />)
            }
        </section>
        </div>
    </>
}