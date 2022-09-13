import { Route, Routes, Outlet } from "react-router-dom"
import { AdminHomePageView } from "./AdminPage"

export const AdminView = () => {
	return (
		<Routes>
			<Route path='/' element={
				<>
					<AdminHomePageView />

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