import { Link } from "react-router-dom"
import "./HomePage.css"


export const UpcomingTrip = ({tripObject, departureDate, returnDate}) => {



    return <>
    <section className="upcomingtrip">
        <div>Departing on {departureDate}</div>
        <div>Returning on {returnDate}</div>
    </section>
    
    
    </>
}