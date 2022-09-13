import { TravelerViews } from "./TravelerViews"
import { AdminView } from "./AdminView"

export const ApplicationViews = () => {
	
	const localAppUser = localStorage.getItem("travelbuddy_user")
    const appUserObject = JSON.parse(localAppUser)

	if (appUserObject.admin) {
        return <AdminView />
    } else {
        return <TravelerViews />
    }
}
