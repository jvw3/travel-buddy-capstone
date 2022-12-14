import { TravelerViews } from "./TravelerViews"
import { AdminView } from "./AdminView"

// This component is responsible for determining the appropriate view for the type of user logged in.
export const ApplicationViews = () => {

	const localAppUser = localStorage.getItem("travelbuddy_user")
    const appUserObject = JSON.parse(localAppUser)

	if (appUserObject.admin) {
        return <AdminView />
    } else {
        return <TravelerViews />
    }
}
