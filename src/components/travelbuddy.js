import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./navbar/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { LandingPage } from "./views/LandingPage"

//This component is responsible for rendering the login information, and if the user is a travelbuddy user (traveler or admin), they will be directed into the application with the appropriate view. If they are not a travelbuddy user...
export const TravelBuddy = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

    
		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}
