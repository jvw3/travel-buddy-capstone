import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//This component renders the NavBar for users taht are logged in as travelers.
export const TravelerNavBar = () => {
    const navigate = useNavigate()


    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
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
            <li>
            </li>
            <li className="nav_logout">
                <Link className="navbar_link" to="" onClick={() => {
                    localStorage.removeItem("travelbuddy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
        </div>
        </nav>
    )
}