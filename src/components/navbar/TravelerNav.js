import { Link, useNavigate } from "react-router-dom"


export const TravelerNavBar = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="nav_locations">
                <Link className="navbar_link" to="/locations">Community</Link>
            </li>
            <li className="nav_products">
                <Link className="navbar_link" to="products">My Trips</Link>
            </li>
            <li className="nav_findcandy">
                <Link className="navbar_link" to="candy">Profile</Link>
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