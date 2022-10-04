import { Route, Routes, Outlet } from "react-router-dom"
import { AdminReviewContainer } from "../community/AdminReviewContainer"

export const AdminView = () => {
	return (
		<Routes>
			<Route path='/' element={
				<>
					<AdminReviewContainer />

					<Outlet />
				</>
			}>


				
			</Route>
			
			
			
			


		</Routes>
	)
}