


export const IndividualTrip = ({ flight, airline, flightDepart, flightArrival }) => {
    return <section className="itinerary" >
                        <div>{flight}</div>
                        <div>airline: {airline}</div>
                        <div>Flight Departure: {flightDepart}</div>
                        <div>Flight Arrival: {flightArrival}</div>
                    </section>
}