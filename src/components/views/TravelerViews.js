import { Route, Routes, Outlet } from "react-router-dom"
import { ItineraryForm } from "../itineraries/ItineraryForm"
import { UserItineraries } from "../itineraries/MyTrips"
import { HomePageView } from "./TravelerHomePage"

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
		</Routes>
	)
}
