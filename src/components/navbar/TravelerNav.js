import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const TravelerNavBar = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="nav_link">
                <Link className="navbar_link_home" to="home">Home</Link>
            </li>
            <li className="nav_link">
                <Link className="navbar_link" to="community">Community</Link>
            </li>
            <li className="nav_link">
                <Link className="navbar_link" to="trips">My Trips</Link>
            </li>
            <li className="nav_link">
                <Link className="navbar_link" to="createnewtrip">Create New Trip</Link>
            </li>
            <li className="nav_link">
                <Link className="navbar_link" to="profile">Profile</Link>
            </li>
            <li className="nav_logout">
                <Link className="navbar_link" to="" onClick={() => {
                    localStorage.removeItem("travelbuddy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}