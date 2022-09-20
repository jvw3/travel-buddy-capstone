import { Route, Routes, Outlet } from "react-router-dom"
import { IndividualTripDetails } from "../itineraries/IndividualTripDetails"
import { ItineraryForm } from "../itineraries/ItineraryForm"
import { UserItineraries } from "../itineraries/MyTrips"
import { HomePageView } from "./TravelerHomePage"
import { EditItinerary} from "../itineraries/itineraryEdit"

export const TravelerViews = () => {
	return (
		<Routes>
			<Route path='/' element={
				<>
					<HomePageView />

					<Outlet />
				</>
			}>
			</Route>
            
            <Route path="home" element={ <HomePageView />} />

            <Route path="trips" element={ <UserItineraries />} />

            <Route path="createnewtrip" element={ <ItineraryForm />} />

			<Route path="trips/:usertripId/view" element={ <IndividualTripDetails/> } />

			<Route path="trips/:usertripId/editItinerary" element={ <EditItinerary/> } />
		</Routes>
	)
}
