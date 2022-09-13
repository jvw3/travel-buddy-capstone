import { Route, Routes, Outlet } from "react-router-dom"
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
			
			
			
			


		</Routes>
	)
}
{/* <Route path="home" element={ <HomePageView />} />

				<Route path="locations" element={ <LocationList />} />

				<Route path="products" element={ <ProductList /> } />

				<Route path="candy" element={ <CandyContainer /> } />

				<Route path="candycart" element={ <CandyCart /> } /> */}