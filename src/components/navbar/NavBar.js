import { AdminNavBar } from "./AdminNav"
import { LandingPageNavBar } from "./LandingPageNav"
import { TravelerNavBar } from "./TravelerNav"


export const NavBar = () => {

    const localAppUser = localStorage.getItem("travelbuddy_user")
    const appUserObject = JSON.parse(localAppUser)

    // We are returing the actual function here, it is imported from its component at the top. 
    if (appUserObject.admin) {
        return <AdminNavBar />
    } else if (!appUserObject.admin) {
    return <TravelerNavBar />;
    } else {
        return <LandingPageNavBar />;
    }
}