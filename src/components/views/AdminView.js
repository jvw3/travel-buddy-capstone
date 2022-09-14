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