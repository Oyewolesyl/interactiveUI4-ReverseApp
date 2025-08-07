import { Link, useLocation } from "react-router-dom";
import homeIconActive from "../assets/home-icon-active.svg";
import homeIconInactive from "../assets/homeinactive.svg";
import recycleActive from "../assets/recycle-active.svg";
import recycleInactive from "../assets/recycle-inactive.svg";
import exploreIcon from "../assets/explore_24px.svg";
import profileActive from "../assets/pofile-active.svg";
import profileInactive from "../assets/profile.svg";

export const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${path === "/" ? "active" : ""}`}>
        <img
          src={path === "/" ? homeIconActive : homeIconInactive}
          width="32"
          height="32"
          alt="Home"
        />
        <span>Home</span>
      </Link>
      <Link to="/manual" className={`nav-item ${path === "/manual" ? "active" : ""}`}>
        <img
          src={path === "/manual" ? recycleActive : recycleInactive}
          width="32"
          height="32"
          alt="Recycle"
        />
        <span>Recycle</span>
      </Link>
      <Link to="/discover" className={`nav-item ${path === "/discover" ? "active" : ""}`}>
        <img src={exploreIcon || "/placeholder.svg"} width="32" height="32" alt="Discover" />
        <span>Discover</span>
      </Link>
      <Link to="/profile" className={`nav-item ${path === "/profile" ? "active" : ""}`}>
        <img
          src={path === "/profile" ? profileActive : profileInactive}
          width="32"
          height="32"
          alt="Profile"
        />
        <span>Profile</span>
      </Link>
    </nav>
  );
};
