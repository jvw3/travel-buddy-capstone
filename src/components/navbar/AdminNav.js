import { Link, useNavigate } from "react-router-dom"


export const AdminNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar"> 
            <li className="nav_customers">
                <Link className="navbar_link" to="customers">Community</Link>
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