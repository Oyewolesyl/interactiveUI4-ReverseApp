import { Link, useLocation } from "react-router-dom";

// Import your images here — replace placeholders with your actual file names
import homeIconActive from "../assets/home-icon-active.svg"; // placeholder
import homeIconInactive from "../assets/homeinactive.svg";    // placeholder
import recycleActive from "../assets/recycle-active.svg";     // placeholder
import recycleInactive from "../assets/recycle-inactive.svg"; // placeholder
import exploreIcon from "../assets/explore_24px.svg";         // placeholder
import profileActive from "../assets/pofile-active.svg";     // placeholder
import profileInactive from "../assets/profile.svg";          // placeholder

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
      <Link to="#" className="nav-item">
        <img src={exploreIcon} width="32" height="32" alt="Discover" />
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
