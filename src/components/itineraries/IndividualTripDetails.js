import { useParams } from "react-router-dom"
import { useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { ActivitySchedule } from "./ActivitySchedule"
import "./IndividualTripDetails.css"
import { getAllActivities } from "../api/APImanager"

// 

export const IndividualTripDetails = ({}) => {
    const {usertripId} = useParams()
    const[activities, setActivities]= useState([])
    const[userItinerary, updateUserItinerary] = useState()
    const[destination, updateDestination] = useState()
    const[itineraryActivities, setItineraryActivities] = useState([])
    const[activityFormVisibility,setFormVisibility] = useState(false)

// useEffect(
//     () => {
//         if (!activityFormVisibility) {
//             setFormVisibility(true)
//         } else if (activityFormVisibility) {
            
//         }
//     }, [activityFormVisibility]
// )


//Need to get the current itineraryId for the itineraryActivity.

// iterate through useritineraries to find itineraries for user.


const[itineraryActivity, updateItineraryActivity] = useState({ 
    activityId: 0,
    description: "",
    rating: "",
    activityDateTime: "",
    review: "",
    flags: "",
    isPublic: "",
    isComplete: ""
})


//This useEffect fetches the array of itineraries from the API, stores it as activitiesData, then setActivities setterFunction uses activitiesData to set the activities stateVariable.
useEffect(
        () => {
            fetch(`http://localhost:8099/itineraries`)
            .then(res => res.json())
            .then(
                (activitiesData) => {
                    setActivities(activitiesData)
                }
            )
        }, []
)

useEffect(
        () => {
            fetch(`http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${usertripId}`)
            .then(res => res.json())
            .then(
                (itineraryActivitiesData) => {
                    setItineraryActivities(itineraryActivitiesData)
                }
            )
        }, []
)

console.log(userItinerary?.itineraryId)

const postItineraryActivity = (event) => {
    event.preventDefault()

        const itineraryActivityToAPI = {
        itineraryId: parseInt(userItinerary?.itineraryId),
        activityId: parseInt(itineraryActivity.activityId),
        description: itineraryActivity.description,
        address: itineraryActivity.address,
        activityDateTime: itineraryActivity.activityDateTime,
        rating: "",
        review: "",
        isPublic: false,
        isComplete: false
    }

    return fetch(`http://localhost:8099/itineraryActivities`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itineraryActivityToAPI)
    })
    .then(res => res.json())
    .then(
        () => {

        })
}


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

// This useEffect Hooks fetches all of the activities. 
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





// When Add Activity button is clicked, a new activity form is created 
// const generateActivityForm = () => {
//     return <form>
// <fieldset>
// <label>Activity</label>
//     <input type="text">
//     </input>
// </fieldset>
// <fieldset>
//     <label>Activity Date</label>
//     <input type="text">
//     </input>
// </fieldset>
// <fieldset>
//     <label>Activity Address</label>
//     <input type="text">
//     </input>
// </fieldset>
//     </form>
// }

    

    return <>
    <section className="full-trip-view">
        <section className={destination?.location.city + "tripheader"}>
        <div className="headeroverlay">
        <h2>Traveling to {destination?.location?.city}, {destination?.location?.state}</h2>
        <div className="accessCode">Access code: {userItinerary?.itinerary?.accessCode}</div>
        <Link className="headereditlink" to={`/trips/${userItinerary?.itineraryId}/editItinerary`}>Edit your Itinerary</Link>
        <button className="deletetrip">Delete Trip</button>
        <h3 class="departuredate">Leaving on: {userItinerary?.itinerary?.departureDate}</h3>
        <h3 class="returndate">Returning on: {userItinerary?.itinerary?.returnDate}</h3>
        </div>
        </section>
        <div className="transportationinfo">
        <section className="flightinfo">
        <h4>Flight Info:</h4>
        <div>Flight to {destination?.location?.city}: {userItinerary?.itinerary?.flightInfo?.departFlightNum} leaving at: {userItinerary?.itinerary?.flightInfo?.flightToDestinationTime}</div>
        <div>Return Flight: {userItinerary?.itinerary?.flightInfo?.returnFlightNum} leaving at: {userItinerary?.itinerary?.flightInfo?.returnFlightTime} </div>
        </section>
        <section className="rentalinfo">
        <h4>Rental Car Info:</h4>
        <div>Renting from:{userItinerary?.itinerary?.rentalCarInfo?.rentalCompany}</div>
        <div>Reservation #: {userItinerary?.itinerary?.rentalCarInfo?.reservationNum}</div>
        <div>Reservation start: {userItinerary?.itinerary?.rentalCarInfo?.reservationTime}</div>
        <div>Car Drop off Time: {userItinerary?.itinerary?.rentalCarInfo?.carDropOffTime}</div>
        </section>
        </div>
    </section>
    <section>
        <h3>Activities</h3>
        <button
        onClick={() => {setFormVisibility(true)}}
        >Display Activity Form</button>
        <button
        onClick={() => {setFormVisibility(false)}}
        >Hide Activity Form</button>
    </section>
    {
    (activityFormVisibility)
        ? <>
    <section>
        <form>
<fieldset>
                <div className="form-group">
                    <label htmlFor="name">Choose Activity:</label>
                    <select className="form-control"
                    value={itineraryActivity.activityId}
                    required autoFocus
                    onChange={ 
                            (evt) => {
                                const copy = {...itineraryActivity}
                                copy.activityId = evt.target.value
                                updateItineraryActivity(copy)
                            } 
                            }> 
                            <option value="0">Choose your Activity</option>
                            {activities.map(activity=> {
                                return <option value={activity.id} key={activity.id}>{activity.name}</option>
                            })}
                    </select>
                </div>
</fieldset>
<fieldset>
                <div className="departure">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        className="form-control"
                        type="text"
                        value={itineraryActivity.description}
                        onChange={
                            (evt) => {
                                const copy = {...itineraryActivity}
                                copy.description = evt.target.value
                                updateItineraryActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
<fieldset>
                <div className="departure">
                    <label htmlFor="description">Activity Time and Date:</label>
                    <input
                        required autoFocus
                        className="form-control"
                        type="datetime-local"
                        value={itineraryActivity.activityDateTime}
                        onChange={
                            (evt) => {
                                const copy = {...itineraryActivity}
                                copy.activityDateTime = evt.target.value
                                updateItineraryActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
<fieldset>
                <div className="departure">
                    <label htmlFor="description">Activity Address:</label>
                    <input
                        required autoFocus
                        className="form-control"
                        type="text"
                        value={itineraryActivity.address}
                        onChange={
                            (evt) => {
                                const copy = {...itineraryActivity}
                                copy.address = evt.target.value
                                updateItineraryActivity(copy)
                            }
                        } />
                </div>
            </fieldset>
<fieldset></fieldset>
<button
onClick={(clickEvent) => postItineraryActivity(clickEvent)}
            className="btn btn-primary"
>Add to Itinerary!</button>
    </form>
    </section>
    </>
    : ""
    }
    <section className="schedulecontainer">
        <h3>My Schedule</h3>
        <section className="schedulelist">
    {
        itineraryActivities.map(itineraryActivity => <ActivitySchedule 
            key={`itineraryActivity--${itineraryActivity?.id}`}
            itineraryActivityObject={itineraryActivity}
            activity={itineraryActivity?.activity?.name}
            activityDescription={itineraryActivity?.description}
            activityAddress={itineraryActivity?.address}
            activityDateTime={itineraryActivity?.activityDateTime}
            />)
    }
    </section>
    </section>
    </>
}