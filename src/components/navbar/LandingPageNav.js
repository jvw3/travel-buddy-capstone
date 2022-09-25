import { Link, useNavigate } from "react-router-dom";

export const LandingPageNavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="nav_customers">
        <Link className="navbar_link" to="customers">
          About Us 
        </Link>
      </li>
      <li className="nav_logout">
        <Link
          className="navbar_link"
          to=""
          onClick={() => {
            localStorage.removeItem("travelbuddy_user");
            navigate("/", { replace: true });
          }}
        >
          Login
        </Link>
      </li>
    </ul>
  );
};
